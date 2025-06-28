import { AiSTTContent, AiSTTContentType } from "./AiSTTContent";

export type AiSTTReqProps = {
    contentType: AiSTTContentType,
    transcription: string;
    previousContext: string;
}

export class AiSTTReq {
    public transcription: string;
    public previousContext: string;
    public contentType: AiSTTContentType;

    constructor(props: AiSTTReqProps) {
        this.transcription = props.transcription;
        this.previousContext = props.previousContext;
        this.contentType = props.contentType;
    }
}

export type AiSTTResProps = {
    content: AiSTTContent;
    usage: TokenUsage;
}

export class AiSTTRes {
    public content: AiSTTContent;
    public usage: TokenUsage;

    constructor(props: AiSTTResProps) {
        this.content = props.content;
        this.usage = props.usage;
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

