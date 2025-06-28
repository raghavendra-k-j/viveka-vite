import { JsonObj } from "~/core/types/Json";
import { QuestionType } from "../question/QuestionType";
import { QExtras } from "../question/QExtras";
import { logger } from "~/core/utils/logger";

export abstract class Answer {
  constructor() { }
  abstract toJson(): JsonObj;

  static fromTypeAndQExtrasAndMap({ type, map, }: { type: QuestionType; qExtras?: QExtras; map: JsonObj; }): Answer | undefined {
    if (type.isMultipleChoice) {
      return MultipleChoiceAnswer.fromMap(map);
    }
    if (type.isCheckBoxes) {
      return CheckBoxesAnswer.fromMap(map);
    }
    if (type.isTextBox) {
      return TextBoxAnswer.fromMap(map);
    }
    if (type.isTextArea) {
      return TextAreaAnswer.fromMap(map);
    }
    if (type.isFillBlank) {
      return FillBlanksAnswer.fromMap(map);
    }
    if (type.isPairMatch) {
      return PairMatchAnswer.fromMap(map);
    }
    if (type.isTrueFalse) {
      return TrueFalseAnswer.fromMap(map);
    }
    return undefined;
  }
}

export class MultipleChoiceAnswer extends Answer {
  public static readonly keyId = "id";
  public id: number;
  constructor({ id }: { id: number }) {
    super();
    this.id = id;
  }

  toJson(): JsonObj {
    return {
      [MultipleChoiceAnswer.keyId]: this.id,
    };
  }

  static fromMap(map: JsonObj): MultipleChoiceAnswer {
    return new MultipleChoiceAnswer({ id: map[MultipleChoiceAnswer.keyId] });
  }
}

export class CheckBoxesAnswer extends Answer {
  public static readonly keyIds = "ids";
  public ids: number[];

  constructor({ ids }: { ids: number[] }) {
    super();
    this.ids = ids;
  }

  toJson(): JsonObj {
    return {
      [CheckBoxesAnswer.keyIds]: this.ids,
    };
  }

  static fromMap(map: JsonObj): CheckBoxesAnswer {
    return new CheckBoxesAnswer({ ids: map[CheckBoxesAnswer.keyIds] });
  }
}

export class TextBoxAnswer extends Answer {
  public static readonly keyAnswer = "answer";
  public answer: string;

  constructor({ answer }: { answer: string }) {
    super();
    this.answer = answer;
  }

  toJson(): JsonObj {
    return {
      [TextBoxAnswer.keyAnswer]: this.answer,
    };
  }

  static fromMap(map: JsonObj): TextBoxAnswer {
    return new TextBoxAnswer({ answer: map[TextBoxAnswer.keyAnswer] });
  }
}

export class TextAreaAnswer extends Answer {
  public static readonly keyAnswer = "answer";
  public answer: string;

  constructor({ answer }: { answer: string }) {
    super();
    this.answer = answer;
  }

  toJson(): JsonObj {
    return {
      [TextAreaAnswer.keyAnswer]: this.answer,
    };
  }

  static fromMap(map: JsonObj): TextAreaAnswer {
    return new TextAreaAnswer({ answer: map[TextAreaAnswer.keyAnswer] });
  }
}

export class FillBlankInputAnswer {
  public static readonly keyId = "id";
  public static readonly keyAnswer = "answer";

  public id: number;
  public answer: string;

  constructor({ id, answer }: { id: number; answer: string }) {
    this.id = id;
    this.answer = answer;
  }

  toJson(): JsonObj {
    return {
      [FillBlankInputAnswer.keyId]: this.id,
      [FillBlankInputAnswer.keyAnswer]: this.answer,
    };
  }

  static fromMap(map: JsonObj): FillBlankInputAnswer {
    return new FillBlankInputAnswer({ id: map[FillBlankInputAnswer.keyId], answer: map[FillBlankInputAnswer.keyAnswer] });
  }
}

export class FillBlanksAnswer extends Answer {

  public static readonly keyAnswers = "answers";
  public answers: FillBlankInputAnswer[];

  constructor({ answers }: { answers: FillBlankInputAnswer[] }) {
    super();
    this.answers = answers;
  }

  toJson(): JsonObj {
    return {
      [FillBlanksAnswer.keyAnswers]: this.answers.map((e) => e.toJson()),
    };
  }

  toIdMap() {
    logger.debug("FillBlanksAnswer.toIdMap", this.answers);
    const map: Record<number, string> = {};
    for (const answer of this.answers) {
      map[answer.id] = answer.answer;
    }
    return map;
  }

  static fromMap(map: JsonObj): FillBlanksAnswer {
    return new FillBlanksAnswer({ 
      answers: map[FillBlanksAnswer.keyAnswers].map((e: JsonObj) => FillBlankInputAnswer.fromMap(e)) 
    });
  }
}

export class PairMatchAnswerItem {
  public static readonly keyId = "id";
  public static readonly keyCorrectId = "correctId";

  public rowId: number;
  public correctRowId: number;

  constructor({ rowId, correctRowId }: { rowId: number; correctRowId: number }) {
    this.rowId = rowId;
    this.correctRowId = correctRowId;
  }

  toJson(): JsonObj {
    return {
      [PairMatchAnswerItem.keyId]: this.rowId,
      [PairMatchAnswerItem.keyCorrectId]: this.correctRowId,
    };
  }

  static fromMap(map: JsonObj): PairMatchAnswerItem {
    return new PairMatchAnswerItem({ rowId: map[PairMatchAnswerItem.keyId], correctRowId: map[PairMatchAnswerItem.keyCorrectId] });
  }
}

export class PairMatchAnswer extends Answer {
  public static readonly keyAnswers = "answers";
  public answers: PairMatchAnswerItem[];

  constructor({ answers }: { answers: PairMatchAnswerItem[] }) {
    super();
    this.answers = answers;
  }

  toJson(): JsonObj {
    return {
      [PairMatchAnswer.keyAnswers]: this.answers.map((e) => e.toJson()),
    };
  }

  static fromMap(map: JsonObj): PairMatchAnswer {
    return new PairMatchAnswer({ answers: map[PairMatchAnswer.keyAnswers].map((e: JsonObj) => PairMatchAnswerItem.fromMap(e)) });
  }
}

export class TrueFalseAnswer extends Answer {
  public static readonly keyAnswer = "value";
  public value: boolean;

  constructor({ value }: { value: boolean }) {
    super();
    this.value = value;
  }

  toJson(): JsonObj {
    return {
      [TrueFalseAnswer.keyAnswer]: this.value,
    };
  }

  static fromMap(map: JsonObj): TrueFalseAnswer {
    return new TrueFalseAnswer({ value: map[TrueFalseAnswer.keyAnswer] });
  }
}

