export class FormQuestionConst {
    public static readonly SHORT_ANSWER_MAX_LENGTH = 2000;
    public static readonly LONG_ANSWER_MAX_LENGTH = 4000;
    public static readonly FILL_BLANKS_ANSWER_MAX_LENGTH = 255;
    public static readonly FILL_BLANKS_UNDERLINE_LENGTH = 10;
    public static readonly FILL_BLANKS_UNDERLINE = '_'.repeat(FormQuestionConst.FILL_BLANKS_UNDERLINE_LENGTH);
    static MAX_MEDIA_FILES_PER_QUESTION = 10;
}