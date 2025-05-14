import { Content } from "./Content";

export type AiSTTReqProps = {
    transcription: string;
    previousContext: string;
}

export class AiSTTReq {
    public transcription: string;
    public previousContext: string;

    constructor(props: AiSTTReqProps) {
        this.transcription = props.transcription;
        this.previousContext = props.previousContext;
    }
}

export type AiSTTResProps = {
    content: Content;
    usage: TokenUsage;
}

export class AiSTTRes {
    public content: Content;
    public usage: TokenUsage;

    constructor(props: AiSTTResProps) {
        this.content = props.content;
        this.usage = props.usage;
    }

    static empty(): AiSTTRes {
        const content = new Content();
        return new AiSTTRes({
            content: content,
            usage: new TokenUsage({
                prompt: 0,
                response: 0,
                total: 0,
            }),
        });
    }
}


export class TokenUsage {
    public readonly prompt: number;
    public readonly response: number;
    public readonly total: number;

    constructor({
        prompt,
        response,
        total,
    }: {
        prompt: number;
        response: number;
        total: number;
    }) {
        this.prompt = prompt;
        this.response = response;
        this.total = total;
    }
}

