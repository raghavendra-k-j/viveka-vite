/* 
import 'package:flutterapp/commons/utils/map_utils.dart';
import 'package:flutterapp/commons/utils/pair.dart';
import 'package:flutterapp/org/domain/entities/form/question/question_type.dart';
import 'package:flutterapp/org/domain/entities/form/question/q_extras.dart';

abstract class Answer {
  Map<String, dynamic> toMap();

  static Answer? fromTypeAndQExtrasAndMap({
    required QuestionType type,
    QExtras? qExtras,
    required Map<String, dynamic> map,
  }) {
    if (type == QuestionType.multipleChoice) {
      return MultipleChoiceAnswer.fromMap(map);
    }
    if (type == QuestionType.checkboxes) {
      return CheckBoxesAnswer.fromMap(map);
    }
    if (type == QuestionType.textbox) {
      return TextBoxAnswer.fromMap(map);
    }
    if (type == QuestionType.textarea) {
      return TextAreaAnswer.fromMap(map);
    }
    if (type == QuestionType.fillBlanks) {
      return FillBlanksAnswer.fromMap(map);
    }
    if (type == QuestionType.pairMatch) {
      return PairMatchAnswer.fromMap(map);
    }
    if (type == QuestionType.trueFalse) {
      return TrueFalseAnswer.fromMap(map);
    }
    return null;
  }
}

//region Multiple Choice
class MultipleChoiceAnswer extends Answer {
  static const String keyId = 'id';

  final int id;

  MultipleChoiceAnswer({
    required this.id,
  });

  @override
  Map<String, dynamic> toMap() {
    return {keyId: id};
  }

  factory MultipleChoiceAnswer.fromMap(Map<String, dynamic> map) {
    return MultipleChoiceAnswer(id: map.getInt(keyId));
  }
}
//endregion

//region CheckBoxes
class CheckBoxesAnswer extends Answer {
  static const String keyIds = 'ids';

  final List<int> ids;

  CheckBoxesAnswer({
    required this.ids,
  });

  @override
  Map<String, dynamic> toMap() {
    return {keyIds: ids};
  }

  factory CheckBoxesAnswer.fromMap(Map<String, dynamic> map) {
    List<int> answers = map.getList(keyIds).map((e) => e as int).toList();
    return CheckBoxesAnswer(ids: answers);
  }
}
//endregion

//region TextBox
class TextBoxAnswer extends Answer {
  static const String keyAnswer = 'answer';

  final String answer;

  TextBoxAnswer({
    required this.answer,
  });

  @override
  Map<String, dynamic> toMap() {
    return {
      keyAnswer: answer,
    };
  }

  factory TextBoxAnswer.fromMap(Map<String, dynamic> map) {
    return TextBoxAnswer(
      answer: map.getString(keyAnswer),
    );
  }
}
//endregion

//region TextArea
class TextAreaAnswer extends Answer {
  static const String keyAnswer = 'answer';

  final String answer;

  TextAreaAnswer({
    required this.answer,
  });

  @override
  Map<String, dynamic> toMap() {
    return {
      keyAnswer: answer,
    };
  }

  factory TextAreaAnswer.fromMap(Map<String, dynamic> map) {
    return TextAreaAnswer(
      answer: map.getString(keyAnswer),
    );
  }
}
//endregion

//region Fill Blanks
class FillBlankInputAnswer {
  static const String keyId = 'id';
  static const String keyAnswer = 'answer';

  final int id;
  final String answer;

  FillBlankInputAnswer({
    required this.id,
    required this.answer,
  });

  Map<String, dynamic> toMap() {
    return {
      keyId: id,
      keyAnswer: answer,
    };
  }

  @override
  String toString() {
    return 'FillBlankInputAnswer{$keyId: $id, $keyAnswer: $answer}';
  }
}

class FillBlanksAnswer extends Answer {
  static const String keyAnswers = 'answers';
  final List<FillBlankInputAnswer> answers;

  FillBlanksAnswer({
    required this.answers,
  });

  @override
  Map<String, dynamic> toMap() {
    return {
      keyAnswers: answers.map((e) => e.toMap()).toList(),
    };
  }

  factory FillBlanksAnswer.fromMap(Map<String, dynamic> map) {
    return FillBlanksAnswer(
      answers: map.getList(keyAnswers).map((e) {
        e = e as Map<String, dynamic>;
        int id = e.getInt(FillBlankInputAnswer.keyId);
        String answer = e.getString(FillBlankInputAnswer.keyAnswer);
        return FillBlankInputAnswer(id: id, answer: answer);
      }).toList(),
    );
  }

  static Map<int, FillBlankInputAnswer>? toIdBasedAnswerMap(FillBlanksAnswer? answer) {
    if (answer == null) {
      return null;
    }
    return {for (var e in answer.answers) (e).id: e};
  }
}
//endregion

//region PairMatchAnswer
class PairMatchAnswerItem {
  static const String keyId = 'id';
  static const String keyCorrectId = 'correctId';

  final int rowId;
  final int correctRowId;

  PairMatchAnswerItem({
    required this.rowId,
    required this.correctRowId,
  });

  Map<String, dynamic> toMap() {
    return {
      keyId: rowId,
      keyCorrectId: correctRowId,
    };
  }
}

class PairMatchAnswer extends Answer {
  static const String keyAnswers = 'answers';

  final List<PairMatchAnswerItem> answers;

  PairMatchAnswer({
    required this.answers,
  });

  static Map<int, PairMatchAnswerItem> toIdBasedAnswerMap(PairMatchAnswer answer) {
    Map<int, PairMatchAnswerItem> idBasedAnswerMap = {};
    for (int i = 0; i < answer.answers.length; i++) {
      PairMatchAnswerItem item = answer.answers[i];
      idBasedAnswerMap[item.rowId] = item;
    }
    return idBasedAnswerMap;
  }

  @override
  Map<String, dynamic> toMap() {
    return {
      keyAnswers: answers.map((e) => e.toMap()).toList(),
    };
  }

  factory PairMatchAnswer.fromMap(Map<String, dynamic> map) {
    return PairMatchAnswer(
      answers: map.getList('answers').map((e) {
        e = e as Map<String, dynamic>;
        int rowId = e.getInt('id');
        int correctRowId = e.getInt('correctId');
        return PairMatchAnswerItem(rowId: rowId, correctRowId: correctRowId);
      }).toList(),
    );
  }

  static Map<int, Triple<String, String, int>> toIdBasedTripped(PairMatchQExtras qExtras, PairMatchAnswer answer) {
    Map<int, Triple<String, String, int>> resultMap = {};
    Map<int, PairMatchAnswerItem> idBasedAnswerMap = PairMatchAnswer.toIdBasedAnswerMap(answer);
    for (int i = 0; i < qExtras.items.length; i++) {
      PairMatchItem item = qExtras.items[i];
      PairMatchAnswerItem answerItem = idBasedAnswerMap[item.rowId]!;
      resultMap[item.rowId] = Triple(item.colAText, item.colBText, answerItem.correctRowId);
    }
    return resultMap;
  }
}
//endregion

class TrueFalseAnswer extends Answer {
  static const String keyAnswer = 'value';

  final bool value;

  TrueFalseAnswer({
    required this.value,
  });

  @override
  Map<String, dynamic> toMap() {
    return {
      keyAnswer: value,
    };
  }

  factory TrueFalseAnswer.fromMap(Map<String, dynamic> map) {
    return TrueFalseAnswer(
      value: map.getBool(keyAnswer),
    );
  }
}

*/

import { JsonObj } from "~/core/types/Json";


export abstract class Answer {

    constructor() {

    }

    abstract toJson(): JsonObj;
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
}

