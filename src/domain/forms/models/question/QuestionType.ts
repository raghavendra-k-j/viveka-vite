import type { FormType } from "../FormType";
import { AssmntMarksPolicy } from "./AssmntMarksPolicy";

type QuestionTypeProps = {
    type: string;
    name: string;
    assessmentName?: string;
    surveyName?: string;
    assmntMarksPolicy: AssmntMarksPolicy;
    aiGenSupported4Assessment: boolean;
    aiGenSupported4Survey: boolean;
};

export class QuestionType {
    public readonly type: string;
    public readonly name: string;
    public readonly assessmentName?: string;
    public readonly surveyName?: string;
    public readonly assmntMarksPolicy: AssmntMarksPolicy;
    public readonly aiGenSupported4Assessment: boolean;
    public readonly aiGenSupported4Survey: boolean;

    private constructor({ ...props }: QuestionTypeProps) {
        this.type = props.type;
        this.name = props.name;
        this.assessmentName = props.assessmentName;
        this.surveyName = props.surveyName;
        this.assmntMarksPolicy = props.assmntMarksPolicy;
        this.aiGenSupported4Assessment = props.aiGenSupported4Assessment;
        this.aiGenSupported4Survey = props.aiGenSupported4Survey;
    }

    static readonly multipleChoice = Object.freeze(new QuestionType({
        type: "MULTIPLE_CHOICE",
        name: "Multiple Choice",
        assessmentName: "Single Select",
        surveyName: "Single Select",
        assmntMarksPolicy: AssmntMarksPolicy.optional,
        aiGenSupported4Assessment: true,
        aiGenSupported4Survey: true,
    }));

    static readonly checkboxes = Object.freeze(new QuestionType({
        type: "CHECKBOXES",
        name: "Checkboxes",
        assessmentName: "Multiple Select",
        surveyName: "Multiple Select",
        assmntMarksPolicy: AssmntMarksPolicy.optional,
        aiGenSupported4Assessment: true,
        aiGenSupported4Survey: true,
    }));

    static readonly textbox = Object.freeze(new QuestionType({
        type: "TEXTBOX",
        name: "Text Box",
        assessmentName: "Short Answer",
        surveyName: "Short Answer",
        assmntMarksPolicy: AssmntMarksPolicy.optional,
        aiGenSupported4Assessment: true,
        aiGenSupported4Survey: true,
    }));

    static readonly textarea = Object.freeze(new QuestionType({
        type: "TEXTAREA",
        name: "Text Area",
        assessmentName: "Long Answer",
        surveyName: "Long Answer",
        assmntMarksPolicy: AssmntMarksPolicy.optional,
        aiGenSupported4Assessment: true,
        aiGenSupported4Survey: true,
    }));

    static readonly fillBlanks = Object.freeze(new QuestionType({
        type: "FILL_BLANKS",
        name: "Fill in the Blanks",
        assessmentName: "Fill in the Blanks",
        assmntMarksPolicy: AssmntMarksPolicy.required,
        aiGenSupported4Assessment: true,
        aiGenSupported4Survey: false,
    }));

    static readonly pairMatch = Object.freeze(new QuestionType({
        type: "PAIR_MATCH",
        name: "Pair Match",
        assessmentName: "Match the Following",
        assmntMarksPolicy: AssmntMarksPolicy.required,
        aiGenSupported4Assessment: true,
        aiGenSupported4Survey: false,
    }));

    static readonly trueFalse = Object.freeze(new QuestionType({
        type: "TRUE_FALSE",
        name: "True/False",
        assessmentName: "True/False",
        assmntMarksPolicy: AssmntMarksPolicy.required,
        aiGenSupported4Assessment: true,
        aiGenSupported4Survey: false,
    }));

    static readonly groupQuestion = Object.freeze(new QuestionType({
        type: "GROUP_QUESTION",
        name: "Group Question",
        assessmentName: "Case Study",
        assmntMarksPolicy: AssmntMarksPolicy.notAllowed,
        aiGenSupported4Assessment: true,
        aiGenSupported4Survey: false,
    }));

    // Freezing the values array to prevent modification
    static readonly values: readonly QuestionType[] = Object.freeze([
        QuestionType.multipleChoice,
        QuestionType.checkboxes,
        QuestionType.textbox,
        QuestionType.textarea,
        QuestionType.fillBlanks,
        QuestionType.pairMatch,
        QuestionType.trueFalse,
        QuestionType.groupQuestion,
    ]);

    // Freezing the map to prevent modification
    static readonly map: Readonly<Map<string, QuestionType>> = Object.freeze(
        new Map<string, QuestionType>(
            QuestionType.values.map((value) => [value.type, value])
        )
    );

    // Method to safely retrieve a QuestionType by its type
    static fromType(type: string | null): QuestionType | null {
        if (type === null) return null;
        return QuestionType.map.get(type) || null;
    }

    // Getter methods for specific question types
    get isGroup(): boolean {
        return this === QuestionType.groupQuestion;
    }

    get isObjective(): boolean {
        return this === QuestionType.multipleChoice || this === QuestionType.checkboxes;
    }

    get isFillBlank(): boolean {
        return this === QuestionType.fillBlanks;
    }

    get isPairMatch(): boolean {
        return this === QuestionType.pairMatch;
    }

    get isMultipleChoice(): boolean {
        return this === QuestionType.multipleChoice;
    }

    get isCheckBoxes(): boolean {
        return this === QuestionType.checkboxes;
    }

    get isTextBox(): boolean {
        return this === QuestionType.textbox;
    }

    get isTextArea(): boolean {
        return this === QuestionType.textarea;
    }

    get isTrueFalse(): boolean {
        return this === QuestionType.trueFalse;
    }

    // Method to retrieve the name based on the formType (assessment or survey)
    getName(formType: FormType): string {
        if (formType.isAssessment) {
            return this.assessmentName ?? this.name;
        }
        if (formType.isSurvey) {
            return this.surveyName ?? this.name;
        }
        return this.name;
    }

    // Freezing the list of open-ended question types
    static readonly openEndedTypes: readonly QuestionType[] = Object.freeze([
        QuestionType.textbox,
        QuestionType.textarea,
        QuestionType.fillBlanks,
    ]);
}
