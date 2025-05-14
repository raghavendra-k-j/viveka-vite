import { AiLaTexError } from "~/infra/errors/AiLaTexError";

export class AiLaTexService {

    async generateLaTex(userInput: string): Promise<string | null> {
        const API_KEY = "AIzaSyBpaFLWAyzI3SgtL2E6zig14xZFuXvzxkc";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        const payload = {
            contents: [
                { role: "user", parts: [{ text: userInput }] },
                { role: "model", parts: [{ text: '```json\n{"equation": "sin \\\theta + cos \\\theta = 1"}\n```' }] },
            ],
            systemInstruction: {
                role: "user",
                parts: [
                    { text: "Convert the user entered maths/chemical equation to LaTex equation" },
                ],
            },
            generationConfig: {
                temperature: 1,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        equation: { type: "string" },
                    },
                },
            },
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (
                data.candidates &&
                data.candidates[0] &&
                data.candidates[0].content &&
                data.candidates[0].content.parts &&
                data.candidates[0].content.parts[0].text
            ) {
                const candidateText = data.candidates[0].content.parts[0].text.trim();
                let parsed;
                // If response is wrapped in backticks
                if (candidateText.startsWith("```json")) {
                    const match = candidateText.match(/```json\s*([\s\S]+?)\s*```/);
                    if (match && match[1]) {
                        parsed = JSON.parse(match[1]);
                    }
                } else {
                    // Plain JSON string
                    parsed = JSON.parse(candidateText);
                }
                return parsed.equation;
            }
            throw new AiLaTexError({
                message: "No valid LaTeX equation found in Gemini API response",
                description: JSON.stringify(data)
            });
        } catch (e: any) {
            throw new AiLaTexError({
                message: "Error fetching equation from Gemini API",
                description: e?.message || String(e),
                developerMessage: e?.stack
            });
        }
    }

}