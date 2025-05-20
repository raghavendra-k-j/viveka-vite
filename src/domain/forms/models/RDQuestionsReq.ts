export class RDQuestionsReq {
    formId: number;
    responseUid: string;
    filter?: RDQuestionsReqFilter;
    searchQuery?: string;

    constructor(params: {
        formId: number;
        responseUid: string;
        filter?: RDQuestionsReqFilter;
        searchQuery?: string;
    }) {
        this.formId = params.formId;
        this.responseUid = params.responseUid;
        this.filter = params.filter;
        this.searchQuery = params.searchQuery;
    }

    toJson(): any {
        return {
            formId: this.formId,
            responseUid: this.responseUid,
            filter: this.filter?.type,
            searchQuery: this.searchQuery,
        };
    }
}

export class RDQuestionsReqFilter {
    static readonly ALL = new RDQuestionsReqFilter({ type: 'ALL', name: 'All' });
    static readonly ANSWERED = new RDQuestionsReqFilter({ type: 'ANSWERED', name: 'Answered' });
    static readonly NOT_ANSWERED = new RDQuestionsReqFilter({ type: 'NOT_ANSWERED', name: 'Not Answered' });
    static readonly CORRECT = new RDQuestionsReqFilter({ type: 'CORRECT', name: 'Correct' });
    static readonly PARTIALLY_CORRECT = new RDQuestionsReqFilter({ type: 'PARTIALLY_CORRECT', name: 'Partially Correct' });
    static readonly INCORRECT = new RDQuestionsReqFilter({ type: 'INCORRECT', name: 'Incorrect' });
    static readonly NOT_EVALUATED = new RDQuestionsReqFilter({ type: 'NOT_EVALUATED', name: 'Not Evaluated' });
    static readonly AI_EVALUATED = new RDQuestionsReqFilter({ type: 'AI_EVALUATED', name: 'AI Evaluated' });
    static readonly DONE = new RDQuestionsReqFilter({ type: 'DONE', name: 'Manually Evaluated' });

    static readonly assessmentValues = [
        RDQuestionsReqFilter.ALL,
        RDQuestionsReqFilter.ANSWERED,
        RDQuestionsReqFilter.NOT_ANSWERED,
        RDQuestionsReqFilter.CORRECT,
        RDQuestionsReqFilter.PARTIALLY_CORRECT,
        RDQuestionsReqFilter.INCORRECT,
    ];

    static readonly surveyValues = [
        RDQuestionsReqFilter.ALL,
        RDQuestionsReqFilter.ANSWERED,
        RDQuestionsReqFilter.NOT_ANSWERED,
    ];

    readonly type: string;
    readonly name: string;

    private constructor({ type, name }: { type: string; name: string }) {
        this.type = type;
        this.name = name;
    }

    static fromString(filter?: string): RDQuestionsReqFilter | undefined {
        if (!filter) return undefined;
        const value = filter.toUpperCase();
        const allFilters = [
            RDQuestionsReqFilter.ALL,
            RDQuestionsReqFilter.ANSWERED,
            RDQuestionsReqFilter.NOT_ANSWERED,
            RDQuestionsReqFilter.CORRECT,
            RDQuestionsReqFilter.PARTIALLY_CORRECT,
            RDQuestionsReqFilter.INCORRECT,
            RDQuestionsReqFilter.NOT_EVALUATED,
            RDQuestionsReqFilter.AI_EVALUATED,
            RDQuestionsReqFilter.DONE,
        ];
        return allFilters.find(f => f.type === value);
    }
}