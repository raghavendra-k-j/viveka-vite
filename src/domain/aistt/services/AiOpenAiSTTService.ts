import axios from "axios";
import { ResEither } from "~/core/utils/ResEither";
import { AiSTTError } from "../models/AiSTTError";
import { AiSTTReq, AiSTTRes, TokenUsage } from "../models/AiSTTModels";
import { ModelResponseParser } from "./ModelResponseParser";

export class AiSTTServiceOpenAI {
    private readonly API_KEY = "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";
    private readonly MODEL = "gpt-4.1-nano";

    public async generateResponse(req: AiSTTReq): Promise<ResEither<AiSTTError, AiSTTRes>> {
        try {
            const isTestMode = false;
            let modelResponse;
            if (isTestMode) {
                modelResponse = this.getCachedResponseForTest();
            }
            else {
                const payload = this.buildRequestPayload(req);
                const response = await this.sendRequest(payload);
                modelResponse = response.data;
            }
            const rawContent = modelResponse.choices?.[0]?.message?.content;
            if (!rawContent) {
                throw AiSTTError.fromDescription("Empty or invalid model response.");
            }

            // Parse the markdown content from the response
            const contentModel = ModelResponseParser.parse(rawContent);

            // Parse token usage details
            const tokenUsage = this.parseTokenUsage(modelResponse.usage);

            // Build and return the result
            const result = new AiSTTRes({
                content: contentModel,
                usage: tokenUsage,
            });
            return ResEither.data(result);
        } catch (error) {
            const aiSttError = AiSTTError.fromAny(error);
            return ResEither.error(aiSttError);
        }
    }

    private systemPrompt() {
        return `
You are an AI transcriber for mathematical and scientific speech. Your task is to convert user speech—captured via the Web Speech API—into clean Markdown output with embedded LaTeX for mathematical content.

# Instructions:
- This is for exam, so **DO NOT** solve, expand, simplify, or evaluate expressions.
- Reformat the spoken content clearly and cleanly.
- Use normalization when needed based on the context (e.g., "A" → "a", "why" → "y") and standardize math phrases (e.g., "squared" → \`^2\`, "cubed" → \`^3\`, "to the power of n" → \`^n\`, "divided by" → \`/\`, "times" or "multiplied by" → \`\\times\`, "equals" → \`=\`). You can decide other normalizations based on the context of the speech, but not limited to these.
- Punctuation is allowed but should be kept **outside** LaTeX where possible.
- Do **not** repeat or infer content the user did not explicitly say.
- Ensure math expressions are not split across lines unnecessarily.
- Use inline math \`$...$\` for short expressions, and block math \`\\[ ... \\]\` when the user clearly speaks a standalone equation or declares "the equation is...".
- Group related ideas into paragraphs. Use a blank line to separate distinct thoughts.

# Output Format:
Return a Markdown string composed of paragraphs.
- Plain text should be written as-is.
- All math variables and expressions must be wrapped in LaTeX delimiters \`$...$\` or \`\\[ ... \\]\`.
- Use paragraphs separated by blank lines if needed.

# Example Output:
\`\`\`markdown
Let $a = 2$ and $b = 3$.

Substituting into the equation $(a + b)^2 = a^2 + b^2 + 2ab$, we get:

\\[
(2 + 3)^2 = 2^2 + 3^2 + 2 \\times 2 \\times 3
\\]
\`\`\`

Keep formatting clean, readable, and true to the user's spoken input.
    `;
    }


    private buildRequestPayload(req: AiSTTReq): any {
        const combinedInput = `${req.previousContext}\n${req.transcription}`.trim();
        return {
            model: this.MODEL,
            messages: [
                {
                    role: "system",
                    content: this.systemPrompt(),
                },
                {
                    role: "user",
                    content: combinedInput,
                }
            ],
        };
    }

    private async sendRequest(payload: any): Promise<any> {
        const res = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.API_KEY}`,
                }
            }
        );
        return res;
    }

    private parseTokenUsage(usage: any): TokenUsage {
        return new TokenUsage({
            prompt: usage?.prompt_tokens ?? 0,
            response: usage?.completion_tokens ?? 0,
            total: usage?.total_tokens ?? 0,
        });
    }



    public getCachedResponseForTest() {
        return {
            id: "chatcmpl-BX8Bd4C3Q2tvpL1hQqF8xeHlo1TuX",
            object: "chat.completion",
            created: 1747235993,
            model: "gpt-4.1-nano-2025-04-14",
            choices: [
                {
                    index: 0,
                    message: {
                        role: "assistant",
                        content: "Let \\( a = 2 \\) and \\( b = 3 \\). \n\nSubstituting the values of \\( a \\) and \\( b \\) into the equation \\( (a + b)^2 = a^2 + b^2 + 2ab \\), we get: \n\n\\[\n(2 + 3)^2 = 2^2 + 3^2 + 2 \\times 2 \\times 3\n\\]",
                        refusal: null,
                        annotations: []
                    },
                    logprobs: null,
                    finish_reason: "stop"
                }
            ],
            usage: {
                prompt_tokens: 498,
                completion_tokens: 94,
                total_tokens: 592,
                prompt_tokens_details: {
                    cached_tokens: 0,
                    audio_tokens: 0
                },
                completion_tokens_details: {
                    reasoning_tokens: 0,
                    audio_tokens: 0,
                    accepted_prediction_tokens: 0,
                    rejected_prediction_tokens: 0
                }
            },
            service_tier: "default",
            system_fingerprint: "fp_eede8f0d45"
        };
    }

}
