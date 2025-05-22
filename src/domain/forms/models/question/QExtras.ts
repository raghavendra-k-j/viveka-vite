import type { JsonObj } from "~/core/types/Json";
import { QuestionType } from "./QuestionType";

export abstract class QExtras {

    abstract toJson(): JsonObj;

    static fromTypeAndMap(type: QuestionType, qExtras: JsonObj): QExtras {
        const deserializer = QExtras.deserializerMap[type.type];
        return deserializer(qExtras);
    }

    static deserializerMap: Record<string, (json: JsonObj) => QExtras> = {
        [QuestionType.multipleChoice.type]: (json: JsonObj) => MultipleChoiceQExtras.fromJson(json),
        [QuestionType.checkboxes.type]: (json: JsonObj) => CheckBoxesQExtras.fromJson(json),
        [QuestionType.fillBlanks.type]: (json: JsonObj) => FillBlanksQExtras.fromJson(json),
        [QuestionType.pairMatch.type]: (json: JsonObj) => PairMatchQExtras.fromJson(json),
        [QuestionType.trueFalse.type]: (json: JsonObj) => TrueFalseQExtras.fromJson(json),
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

    toJson(): JsonObj {
        return {
            [Choice.keyId]: this.id,
            [Choice.keyText]: this.text,
        };
    }

    static fromJson(json: JsonObj): Choice {
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

    toJson(): JsonObj {
        return {
            [MultipleChoiceQExtras.keyChoices]: this.choices.map(choice => choice.toJson()),
        };
    }

    static fromJson(json: JsonObj): MultipleChoiceQExtras {
        return new MultipleChoiceQExtras({
            choices: json[MultipleChoiceQExtras.keyChoices].map((e: JsonObj) => Choice.fromJson(e)),
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

    toJson(): JsonObj {
        return {
            [CheckBoxesQExtras.keyChoices]: this.choices.map(choice => choice.toJson()),
        };
    }

    static fromJson(json: JsonObj): CheckBoxesQExtras {
        return new CheckBoxesQExtras({
            choices: json[CheckBoxesQExtras.keyChoices].map((e: JsonObj) => Choice.fromJson(e)),
        });
    }
}

export class FillBlankInput {
    static readonly keyId = 'id';

    id: number;

    constructor({ id }: { id: number }) {
        this.id = id;
    }

    toJson(): JsonObj {
        return {
            [FillBlankInput.keyId]: this.id,
        };
    }

    static fromJson(json: JsonObj): FillBlankInput {
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

    toJson(): JsonObj {
        return {
            [FillBlanksQExtras.keyItems]: this.inputs.map(input => input.toJson()),
        };
    }

    static fromJson(json: JsonObj): FillBlanksQExtras {
        return new FillBlanksQExtras({
            inputs: json[FillBlanksQExtras.keyItems].map((e: JsonObj) => FillBlankInput.fromJson(e)),
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

    toJson(): JsonObj {
        return {
            [TrueFalseQExtras.keyTrueLabel]: this.trueLabel,
            [TrueFalseQExtras.keyFalseLabel]: this.falseLabel,
        };
    }

    static fromJson(json: JsonObj): TrueFalseQExtras {
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

    toJson(): JsonObj {
        return {
            [PairMatchItem.keyId]: this.rowId,
            [PairMatchItem.keyColAText]: this.colAText,
            [PairMatchItem.keyColBText]: this.colBText,
        };
    }

    static fromJson(json: JsonObj): PairMatchItem {
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

    toJson(): JsonObj {
        return {
            [PairMatchQExtras.keyItems]: this.items.map(item => item.toJson()),
        };
    }

    static fromJson(json: JsonObj): PairMatchQExtras {
        return new PairMatchQExtras({
            items: json[PairMatchQExtras.keyItems].map((e: JsonObj) => PairMatchItem.fromJson(e)),
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