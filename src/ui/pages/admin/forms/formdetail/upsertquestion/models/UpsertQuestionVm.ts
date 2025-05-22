/* 
import 'package:flutter/material.dart';
import 'package:flutterapp/commons/utils/bool3.dart';
import 'package:flutterapp/org/domain/entities/form/form_type.dart';
import 'package:flutterapp/org/domain/entities/form/qmedia/qmedia_tile.dart';
import 'package:flutterapp/org/domain/entities/form/question/question_level.dart';
import 'package:flutterapp/org/domain/entities/form/question/question_type.dart';
import 'package:flutterapp/org/domain/entities/form/question/upsert_question_request.dart';
import 'package:flutterapp/org/presentation/screens/admin/form_detail/questions_fragment/edit_question_dialog/edit_question_dialog_controller.dart';
import 'package:flutterapp/org/presentation/screens/admin/form_detail/questions_fragment/edit_question_dialog/edit_question_ena_view.dart';
import 'package:flutterapp/org/presentation/screens/admin/form_detail/questions_fragment/edit_question_dialog/edit_question_ena_vm.dart';
import 'package:flutterapp/org/presentation/screens/admin/form_detail/questions_fragment/edit_question_dialog/eqfqe_view.dart';
import 'package:flutterapp/org/presentation/screens/admin/form_detail/questions_fragment/questions_fragment_controller.dart';
import 'package:flutterapp/org/presentation/screens/admin/form_detail/questions_fragment/vm/question_vm.dart';
import 'package:flutterapp/org/resources/ln.dart';
import 'package:get/get.dart';

class EditQuestionVm {
  final int? id;
  final int formId;
  final QuestionVm? parentVm;
  final FormType formType;
  final QuestionType type;
  final RxBool3 scorable;
  TextEditingController? marksEC;
  Rx<QuestionLevel?>? level;
  final TextEditingController questionEC;
  final FocusNode questionFN = FocusNode();
  final EditQuestionEnAVm enaVm;
  TextEditingController? ansHintEC;
  TextEditingController? ansExplanationEC;
  final RxBool3 isRequired;
  final GlobalKey<EditQuestionEnAViewState> enaViewStateKey;
  final RxBool showMoreFields = RxBool(false);
  final RxBool isMediaRemoved = RxBool(false);
  final RxList<QMediaTile> mediaFiles;
  final Rx<EditQuestionFormQuestionExtView?> eqfView;
  final Ln ln;

  EditQuestionVm({
    this.id,
    required this.formId,
    this.parentVm,
    required this.formType,
    required this.type,
    required this.scorable,
    this.marksEC,
    required this.level,
    required this.questionEC,
    required this.enaVm,
    required this.ansHintEC,
    required this.ansExplanationEC,
    required this.isRequired,
    required this.enaViewStateKey,
    required this.mediaFiles,
    required this.eqfView,
    required this.ln,
  });

  void setLevel(QuestionLevel? value) {
    if (value == null) {
      level?.value = null;
      return;
    }
    level?.value = value;
  }

  /// Update weather a question is scorable or not
  /// if scorable is true, then initialize the related fields else clear unwanted fields
  void setScorable(bool value) {
    scorable.value = Bool3.fromBool(value);
    enaVm.scorable = scorable.value;
    if (value) {
      marksEC ??= TextEditingController();
      level ??= Rx<QuestionLevel?>(QuestionLevel.medium);
      marksEC?.text = double.tryParse(marksEC?.text ?? '')?.toString() ?? '1';
      level?.value = QuestionLevel.medium;
      ansHintEC ??= TextEditingController();
      ansExplanationEC ??= TextEditingController();
    } else {
      level?.value = null;
      marksEC?.clear();
    }
  }

  void toggleScorable() => setScorable(scorable.value.inverse.isTrue);

  EditQuestionVm copyWith({
    int? id,
    int? formId,
    FormType? formType,
    QuestionType? type,
    QuestionVm? parentVm,
    RxBool3? evaluable,
    TextEditingController? marksEC,
    Rx<QuestionLevel?>? level,
    TextEditingController? questionEC,
    EditQuestionEnAVm? enaVm,
    TextEditingController? ansHintEC,
    TextEditingController? ansExplanationEC,
    RxBool3? isRequired,
    RxList<QMediaTile>? mediaFiles,
    GlobalKey<EditQuestionEnAViewState>? enaViewStateKey,
    Rx<EditQuestionFormQuestionExtView?>? eqfView,
    Ln? ln,
  }) {
    return EditQuestionVm(
      id: id ?? this.id,
      formId: formId ?? this.formId,
      formType: formType ?? this.formType,
      type: type ?? this.type,
      parentVm: parentVm ?? this.parentVm,
      scorable: evaluable ?? scorable,
      marksEC: marksEC ?? this.marksEC,
      level: level ?? this.level,
      questionEC: questionEC ?? this.questionEC,
      enaVm: enaVm ?? this.enaVm,
      ansHintEC: ansHintEC ?? this.ansHintEC,
      ansExplanationEC: ansExplanationEC ?? this.ansExplanationEC,
      isRequired: isRequired ?? this.isRequired,
      enaViewStateKey: enaViewStateKey ?? this.enaViewStateKey,
      mediaFiles: mediaFiles ?? this.mediaFiles,
      eqfView: eqfView ?? this.eqfView,
      ln: ln ?? this.ln,
    );
  }

  /// Generate an upsert request for the question
  UpsertQuestionRequest getUpsertRequest({
    required EditQuestionDialogController controller,
    required String question,
    String? answerExplanation,
  }) {
    final ansHint = ansHintEC?.text.trim();
    final String? ansExplanation = ansExplanationEC?.text;
    final marks = scorable.value.isTrue ? double.tryParse(marksEC?.text.trim() ?? '') : null;
    final level = scorable.value.isTrue ? this.level?.value : null;
    if (id != null) {
      return UpdateQuestionRequest(
        id: id!,
        formId: formId,
        type: type,
        parentId: parentVm?.id,
        marks: marks,
        level: level,
        question: question,
        qExtras: enaVm.getQExtras(),
        answer: enaVm.getAnswer(),
        ansHint: ansHint,
        ansExplanation: ansExplanation,
        isRequired: isRequired.value,
        isAiGenerated: Bool3.N,
        mediaRefs: mediaFiles.map((e) => MediaTileRefRequest(id: e.id)).toList(),
      );
    } else {
      return CreateQuestionRequest(
        formId: formId,
        type: type,
        parentId: parentVm?.id,
        marks: marks,
        level: level,
        question: question,
        qExtras: enaVm.getQExtras(),
        answer: enaVm.getAnswer(),
        ansHint: ansHint,
        ansExplanation: ansExplanation,
        isRequired: isRequired.value,
        isAiGenerated: Bool3.N,
        mediaRefs: mediaFiles.map((e) => MediaTileRefRequest(id: e.id)).toList(),
      );
    }
  }

  /// Create an instance from an existing question
  factory EditQuestionVm.fromExistingQuestion({
    required QuestionVm questionVm,
    required FormType formType,
    required QuestionsFragmentController controller,
    required Ln ln,
  }) {
    RxBool3 scorable = RxBool3(Bool3.N); // initialize to not applicable
    Bool3 canHaveMarks = questionVm.type.canHaveMarks(formType: formType);
    if (canHaveMarks.isTrue) {
      if (questionVm.marks != null) {
        scorable = RxBool3(Bool3.T); // It already has marks, so set to true
      } else {
        scorable = RxBool3(Bool3.F); // It does not have marks, so set to false
      }
    }

    TextEditingController questionEC = TextEditingController(text: questionVm.question);
    TextEditingController ansExplanationEC = TextEditingController(text: questionVm.ansExplanation);

    return EditQuestionVm(
      id: questionVm.id,
      formId: questionVm.formId,
      parentVm: questionVm,
      formType: formType,
      type: questionVm.type,
      scorable: scorable,
      marksEC: (questionVm.marks != null) ? TextEditingController(text: questionVm.marks.toString()) : null,
      level: (questionVm.level != null) ? Rx<QuestionLevel?>(questionVm.level) : null,
      questionEC: questionEC,
      enaVm: EditQuestionEnAVm.fromQuestion(question: questionVm.toQuestion(), scorable: scorable.value),
      ansHintEC: TextEditingController(text: questionVm.ansHint),
      ansExplanationEC: ansExplanationEC,
      isRequired: RxBool3(questionVm.isRequired),
      enaViewStateKey: GlobalKey<EditQuestionEnAViewState>(),
      mediaFiles: RxList<QMediaTile>.from(questionVm.mediaFiles ?? []),
      eqfView: Rx<EditQuestionFormQuestionExtView?>(EditQuestionFormQuestionExtView.create(questionVm.type)),
      ln: ln,
    );
  }

  /// factory constructor to create new instance of the question
  /// - used for new question
  factory EditQuestionVm.newQuestion({
    required FormType formType,
    required QuestionType questionType,
    required int formId,
    QuestionVm? parentQuestionVm,
    required String question,
    required QuestionsFragmentController controller,
    required Ln ln,
  }) {
    final RxBool3 scorable = RxBool3.fromBool3(questionType.canHaveMarks(formType: formType));
    final TextEditingController questionEC = TextEditingController();
    TextEditingController? ansHintEC;
    TextEditingController? ansExplanationEC;
    final enaVm = EditQuestionEnAVm.newEnAVm(questionType: questionType, scorable: scorable.value, questionEC: questionEC);
    final RxBool3 isRequired = RxBool3.fromBool3(questionType == QuestionType.groupQuestion ? Bool3.N : Bool3.F);
    if (formType.isAssessment) {
      ansHintEC = TextEditingController(text: '');
      EditQuestionFormQuestionExtView? eqfView = EditQuestionFormQuestionExtView.create(questionType);
      ansExplanationEC = TextEditingController();
      return EditQuestionVm(
        formType: formType,
        type: questionType,
        formId: formId,
        parentVm: parentQuestionVm,
        scorable: scorable,
        marksEC: TextEditingController(text: '1'),
        level: Rx<QuestionLevel?>(QuestionLevel.medium),
        questionEC: questionEC,
        enaVm: enaVm,
        ansHintEC: ansHintEC,
        ansExplanationEC: ansExplanationEC,
        isRequired: isRequired,
        enaViewStateKey: GlobalKey<EditQuestionEnAViewState>(),
        mediaFiles: RxList<QMediaTile>(),
        eqfView: Rx<EditQuestionFormQuestionExtView?>(eqfView),
        ln: ln,
      );
    } else {
      EditQuestionFormQuestionExtView? eqfView = EditQuestionFormQuestionExtView.create(questionType);
      return EditQuestionVm(
        formType: formType,
        type: questionType,
        formId: formId,
        parentVm: parentQuestionVm,
        scorable: scorable,
        marksEC: null,
        level: null,
        questionEC: questionEC,
        enaVm: enaVm,
        ansHintEC: TextEditingController(),
        ansExplanationEC: ansExplanationEC,
        isRequired: isRequired,
        enaViewStateKey: GlobalKey<EditQuestionEnAViewState>(),
        mediaFiles: RxList<QMediaTile>(),
        eqfView: Rx<EditQuestionFormQuestionExtView?>(eqfView),
        ln: ln,
      );
    }
  }
}
*/

import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { Bool3 } from "~/core/utils/Bool3";
import { QuestionLevel } from "~/domain/forms/models/question/QuestionLevel";

export type UpsertQuestionVmProps = {
    id?: number;
    storeRef: UpsertQuestionStore;
    type: QuestionType;
    scorable: Bool3;
    marks?: number;
    level?: QuestionLevel;
    questionText: string;
    ansHint?: string;
    ansExplanation?: string;
    isRequired: Bool3;
}


export class UpsertQuestionVm {
    readonly id?: number;
    readonly storeRef: UpsertQuestionStore;
    readonly type: QuestionType;
    scorable: Bool3;
    marks?: number;
    level?: QuestionLevel;
    questionText: string;
    ansHint?: string;
    ansExplanation?: string;
    isRequired: Bool3;

    constructor(props: UpsertQuestionVmProps) {
        this.id = props.id;
        this.storeRef = props.storeRef;
        this.type = props.type;
        this.scorable = props.scorable;
        this.marks = props.marks;
        this.level = props.level;
        this.questionText = props.questionText;
        this.ansHint = props.ansHint;
        this.ansExplanation = props.ansExplanation;
        this.isRequired = props.isRequired;
    }
}