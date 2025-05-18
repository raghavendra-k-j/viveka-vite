import axios from "axios";
import { ResEither } from "~/core/utils/ResEither";
import { AiSTTError } from "../models/AiSTTError";
import { AiSTTReq, AiSTTRes, TokenUsage } from "../models/AiSTTModels";
import { ModelResponseParser } from "./ModelResponseParser";

export class AiSTTService {
    private readonly API_KEY = "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";
    private readonly MODEL = "gpt-4o";

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
You are an AI transcriber converting user speech—captured via the Web Speech API—into clean Markdown output with embedded LaTeX for all mathematical and scientific content.

# Role and Context
This is an **exam transcription environment**. You are **not** an assistant or tutor. You should **not solve, explain, complete, simplify, or add** any information beyond what the user says. Your sole task is to transcribe the spoken input into clean, accurate Markdown.


# Transcribe Instructions
- Transcribe the user speech faithfully with **minor corrections only** (such as fixing obvious spelling or case errors as specified below), but **do NOT complete, solve, simplify, or infer any missing parts of the speech or equations**.

- Display the final output **exactly in Markdown format**, following the detailed output instructions below.

# Correction Instructions
- Allow minor spelling corrections to fix common voice recognition mistakes (e.g., "we" → "v", "why" → "y") when needed.
- Normalize case for mathematical variables when appropriate (e.g., uppercase "A" → lowercase "a").   
- Do **not** add, remove, or infer any mathematical content beyond these minor corrections.

# Output Instructions
- Return Markdown text with paragraphs separated by blank lines.  
- Transcribe plain text as-is.  
- Wrap all math variables and expressions in LaTeX delimiters: use inline math \`$...$\` for short expressions and block math \`\\[ ... \\]\` for standalone equations.  
- Keep punctuation outside LaTeX expressions where possible.  
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
