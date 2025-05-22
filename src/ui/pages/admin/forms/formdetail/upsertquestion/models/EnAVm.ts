import { QExtras } from "~/domain/forms/models/question/QExtras";
import { UpsertQuestionStore } from "../UpsertQuestionStore"
import { Answer } from "~/domain/forms/models/answer/Answer";

export type EnAVmProps = {
    storeRef: UpsertQuestionStore;
}

export abstract class EnAVm {
    private readonly storeRef: UpsertQuestionStore;
    constructor(props: EnAVmProps) {
        this.storeRef = props.storeRef;
    }
    abstract getQExtra(): QExtras | undefined;
    abstract getAnswer(): Answer | undefined;
}

export type EnAChoiceVmProps = EnAVmProps & {
    text: string;
    selected?: boolean;
}


export type ObjEnAVmProps = EnAVmProps & {
    choices: EnAChoiceVmProps[];
}

export class ObjEnAVm extends EnAVm {

    private readonly choices: EnAChoiceVmProps[];
    constructor(props: ObjEnAVmProps) {
        super(props);
        this.choices = props.choices;
    }

    getQExtra(): QExtras | undefined {
        return undefined;
    }

    getAnswer(): Answer | undefined {
        return undefined;
    }
}