import { ResEither } from "~/core/utils/ResEither";
import { geminiAxiosInstance } from "../apiclients/geminiClient";
import { AiSTTError } from "../models/AiSTTError";
import { AiSTTReq, AiSTTRes, TokenUsage } from "../models/AiSTTModels";
import { Content } from "../models/Content";
import { Paragraph } from "../models/Paragraph";
import { TextRun } from "../models/TextRun";
import { TextRunType } from "../models/TextRunType";


type GeminiResponse = {
    candidates?: {
        content?: {
            parts?: { text: string }[];
        };
    }[];
    usageMetadata?: {
        promptTokenCount: number;
        candidatesTokenCount: number;
        totalTokenCount: number;
    };
};

export class AiGeminiSTTService {
    private readonly MODEL = "gemini-1.5-pro:generateContent";
    private readonly API_KEY = "AIzaSyBpaFLWAyzI3SgtL2E6zig14xZFuXvzxkc";

    public async generateResponse(req: AiSTTReq): Promise<ResEither<AiSTTError, AiSTTRes>> {
        try {
            const payload = this.buildRequestPayload(req);
            const response = await this.sendRequest(payload);
            const parsedJson = this.getCleanedJson(response);
            const contentModel = this.convertToModels(parsedJson);
            const tokenUsage = this.parseTokenUsage(response);
            const result = new AiSTTRes({
                content: contentModel,
                usage: tokenUsage,
            });
            return ResEither.data(result);
        }
        catch (error) {
            const aiSttError = AiSTTError.fromAny(error);
            return ResEither.error(aiSttError);
        }
    }

    private buildRequestPayload(req: AiSTTReq): any {
        const combinedInput = `${req.previousContext}\n${req.transcription}`.trim();

        return {
            contents: [
                {
                    role: "user",
                    parts: [{ text: combinedInput }],
                },
            ],
            systemInstruction: {
                role: "user",
                parts: [
                    {
                        text: `You are a LaTeX formatting assistant. The user is speaking math and scientific expressions over time.

Instructions:
- DO NOT solve, expand, differentiate, simplify, or evaluate anything.
- Just reformat the input cleanly and understandably.
- Allow light corrections like fixing "capital A" to "a", or "why" to "y", when clearly meant.
- If the user repeats something like "a is equal to 2" and "b is equal to 3", just clean and retain it.
- The user may speak in fragments—accumulate those as context and treat each as a continuation.

Output must be a JSON array of paragraphs. Each paragraph is an array of text runs:
{
  "type": "text" | "latex",
  "content": string
}

Use "latex" only for math parts, and "text" for all else.
DO NOT include anything the user didn't explicitly say.`,
                    },
                ],
            },
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
                responseMimeType: "application/json",
                responseSchema: {
                    type: "array",
                    items: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                type: { type: "string" },
                                content: { type: "string" },
                            },
                            required: ["type", "content"],
                        },
                    },
                },
            },
        };
    }

    private async sendRequest(payload: any): Promise<GeminiResponse> {
        const endpoint = `${this.MODEL}?key=${this.API_KEY}`;
        const res = await geminiAxiosInstance.post<GeminiResponse>(endpoint, payload);
        return res.data;
    }

    private getCleanedJson(data: GeminiResponse): any[][] {
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!rawText) throw AiSTTError.fromDescription("Empty or invalid model response.");

        let cleanedText = rawText;

        // Handle markdown-style response
        if (cleanedText.startsWith("```json")) {
            const match = cleanedText.match(/```json\s*([\s\S]+?)\s*```/);
            if (match) {
                cleanedText = match[1];
            } else {
                throw AiSTTError.fromDescription("Could not extract JSON content.");
            }
        }

        try {
            return JSON.parse(cleanedText);
        } catch (error) {
            throw AiSTTError.fromAny(error);
        }
    }

    private convertToModels(json: any[][]): Content {
        const paragraphs: Paragraph[] = [];

        for (const runArray of json) {
            const paragraph = new Paragraph();
            for (const run of runArray) {
                if (typeof run.content === "string" && (run.type === "text" || run.type === "latex")) {
                    const textRun = new TextRun({
                        type: run.type === "latex" ? TextRunType.LATEX : TextRunType.TEXT,
                        content: run.content,
                    });
                    paragraph.addRun(textRun);
                }
            }
            paragraphs.push(paragraph);
        }

        return new Content({ paragraphs });
    }

    private parseTokenUsage(response: GeminiResponse): TokenUsage {
        const meta = response.usageMetadata;
        return new TokenUsage({
            prompt: meta?.promptTokenCount ?? 0,
            response: meta?.candidatesTokenCount ?? 0,
            total: meta?.totalTokenCount ?? 0,
        });
    }
}
