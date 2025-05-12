import type { JsonObj } from "~/core/types/Json";
import { QuestionType } from "./QuestionType";

export abstract class QExtras {

    abstract serialize(): JsonObj;

    static fromTypeAndMap(type: QuestionType, qExtras: JsonObj): QExtras {
        const deserializer = QExtras.deserializerMap[type.type];
        return deserializer(qExtras);
    }

    static deserializerMap: Record<string, (json: JsonObj) => QExtras> = {
        [QuestionType.multipleChoice.type]: (json: JsonObj) => MultipleChoiceQExtras.deserialize(json),
        [QuestionType.checkboxes.type]: (json: JsonObj) => CheckBoxesQExtras.deserialize(json),
        [QuestionType.fillBlanks.type]: (json: JsonObj) => FillBlanksQExtras.deserialize(json),
        [QuestionType.pairMatch.type]: (json: JsonObj) => PairMatchQExtras.deserialize(json),
        [QuestionType.trueFalse.type]: (json: JsonObj) => TrueFalseQExtras.deserialize(json),
    };


}

export class Choice {
    static readonly keyId = 'id';
    static readonly keyText = 'text';

    id: number;
    text: string;

    constructor({ id, text }: { id: number; text: string }) {
        this.id = id;
        this.text = text;
    }

    serialize(): JsonObj {
        return {
            [Choice.keyId]: this.id,
            [Choice.keyText]: this.text,
        };
    }

    static deserialize(json: JsonObj): Choice {
        return new Choice({
            id: json[Choice.keyId],
            text: json[Choice.keyText],
        });
    }
}


export class MultipleChoiceQExtras extends QExtras {
    static readonly keyChoices = 'choices';

    choices: Choice[];

    constructor({ choices }: { choices: Choice[] }) {
        super();
        this.choices = choices;
    }

    serialize(): JsonObj {
        return {
            [MultipleChoiceQExtras.keyChoices]: this.choices.map(choice => choice.serialize()),
        };
    }

    static deserialize(json: JsonObj): MultipleChoiceQExtras {
        return new MultipleChoiceQExtras({
            choices: json[MultipleChoiceQExtras.keyChoices].map((e: JsonObj) => Choice.deserialize(e)),
        });
    }
}


export class CheckBoxesQExtras extends QExtras {
    static readonly keyChoices = 'choices';

    choices: Choice[];

    constructor({ choices }: { choices: Choice[] }) {
        super();
        this.choices = choices;
    }

    serialize(): JsonObj {
        return {
            [CheckBoxesQExtras.keyChoices]: this.choices.map(choice => choice.serialize()),
        };
    }

    static deserialize(json: JsonObj): CheckBoxesQExtras {
        return new CheckBoxesQExtras({
            choices: json[CheckBoxesQExtras.keyChoices].map((e: JsonObj) => Choice.deserialize(e)),
        });
    }
}

export class FillBlankInput {
    static readonly keyId = 'id';

    id: number;

    constructor({ id }: { id: number }) {
        this.id = id;
    }

    serialize(): JsonObj {
        return {
            [FillBlankInput.keyId]: this.id,
        };
    }

    static deserialize(json: JsonObj): FillBlankInput {
        return new FillBlankInput({
            id: json[FillBlankInput.keyId],
        });
    }
}

export class FillBlanksQExtras extends QExtras {
    static readonly keyItems = 'items';

    inputs: FillBlankInput[];

    constructor({ inputs }: { inputs: FillBlankInput[] }) {
        super();
        this.inputs = inputs;
    }

    serialize(): JsonObj {
        return {
            [FillBlanksQExtras.keyItems]: this.inputs.map(input => input.serialize()),
        };
    }

    static deserialize(json: JsonObj): FillBlanksQExtras {
        return new FillBlanksQExtras({
            inputs: json[FillBlanksQExtras.keyItems].map((e: JsonObj) => FillBlankInput.deserialize(e)),
        });
    }
}


export class TrueFalseQExtras extends QExtras {
    static readonly keyTrueLabel = 'trueLabel';
    static readonly keyFalseLabel = 'falseLabel';

    trueLabel: string;
    falseLabel: string;

    constructor({ trueLabel, falseLabel }: { trueLabel: string; falseLabel: string }) {
        super();
        this.trueLabel = trueLabel;
        this.falseLabel = falseLabel;
    }

    serialize(): JsonObj {
        return {
            [TrueFalseQExtras.keyTrueLabel]: this.trueLabel,
            [TrueFalseQExtras.keyFalseLabel]: this.falseLabel,
        };
    }

    static deserialize(json: JsonObj): TrueFalseQExtras {
        return new TrueFalseQExtras({
            trueLabel: json[TrueFalseQExtras.keyTrueLabel],
            falseLabel: json[TrueFalseQExtras.keyFalseLabel],
        });
    }
}


export class PairMatchItem {
    static readonly keyId = 'id';
    static readonly keyColAText = 'colAText';
    static readonly keyColBText = 'colBText';

    rowId: number;
    colAText: string;
    colBText: string;

    constructor({ rowId, colAText, colBText }: { rowId: number; colAText: string; colBText: string }) {
        this.rowId = rowId;
        this.colAText = colAText;
        this.colBText = colBText;
    }

    serialize(): JsonObj {
        return {
            [PairMatchItem.keyId]: this.rowId,
            [PairMatchItem.keyColAText]: this.colAText,
            [PairMatchItem.keyColBText]: this.colBText,
        };
    }

    static deserialize(json: JsonObj): PairMatchItem {
        return new PairMatchItem({
            rowId: json[PairMatchItem.keyId],
            colAText: json[PairMatchItem.keyColAText],
            colBText: json[PairMatchItem.keyColBText],
        });
    }
}

export class PairMatchQExtras extends QExtras {
    static readonly keyItems = 'items';

    items: PairMatchItem[];

    constructor({ items }: { items: PairMatchItem[] }) {
        super();
        this.items = items;
    }

    serialize(): JsonObj {
        return {
            [PairMatchQExtras.keyItems]: this.items.map(item => item.serialize()),
        };
    }

    static deserialize(json: JsonObj): PairMatchQExtras {
        return new PairMatchQExtras({
            items: json[PairMatchQExtras.keyItems].map((e: JsonObj) => PairMatchItem.deserialize(e)),
        });
    }

    static toIdBasedItemMap(qExtras: PairMatchQExtras): Record<number, PairMatchItem> {
        const idBasedItemMap: Record<number, PairMatchItem> = {};
        for (const item of qExtras.items) {
            idBasedItemMap[item.rowId] = item;
        }
        return idBasedItemMap;
    }
}