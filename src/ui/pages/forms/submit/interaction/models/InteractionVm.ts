import { makeObservable, observable, runInAction } from "mobx";
import type { QuestionRes } from "~/domain/forms/models/QuestionsRes";
import type { Question } from "~/domain/forms/models/question/Question";
import type { InteractionStore } from "../InteractionStore";
import { QuestionVmFactory } from "./QuestionVmFactory";
import type { QuestionVm } from "./QuestionVm";
import { logger } from "~/core/utils/logger";
import { getTTS } from "~/infra/utils/tts/TTSService";

type InteractionVmProps = {
    questionRes: QuestionRes;
    parentStore: InteractionStore;
};

export class InteractionFormVm {
    title: string;
    description?: string;

    constructor({ ...props }: { title: string; description?: string }) {
        this.title = props.title;
        this.description = props.description;
    }
}

export class InteractionVm {
    formDetail: InteractionFormVm;
    questions!: QuestionVm[];
    parentStore: InteractionStore;
    currentSpeechTag: string | null = null;
    cachedVoice: SpeechSynthesisVoice | null = null;

    constructor(props: InteractionVmProps) {
        this.parentStore = props.parentStore;

        this.formDetail = new InteractionFormVm({
            title: props.questionRes.title,
            description: props.questionRes.description,
        });

        const speechService = getTTS();
        if (speechService) {
            speechService.stop();
        }

        this.initQuestionVms(props.questionRes.questions);
        this.prepareVoice();
        this.addTTSListeners();
        makeObservable(this, {
            currentSpeechTag: observable,
            cachedVoice: observable,
        });
    }

    private getTTSCode() {
        const lang = this.parentStore.parentStore.selectedLanguage?.ttsCode ??
            this.parentStore.formDetail.language.ttsCode;
        return lang;
    }

    async prepareVoice() {
        const speechService = getTTS();
        if (!speechService) return;

        const lang = this.getTTSCode();

        try {
            await speechService.waitForVoices();

            if (speechService.isLangSupported(lang)) {
                const voices = speechService.getAvailableVoicesForLanguage(lang);
                if (voices.length > 0) {
                    runInAction(() => {
                        this.cachedVoice = voices[0];
                    });
                    return;
                }
            }
            logger.warn(`No voices found for language: ${lang}.`);
        }
        catch (e) {
            logger.error("Error preparing voice:", e);
        }
    }

    onTTSStart = (tag: string | null | undefined) => {
        runInAction(() => {
            this.currentSpeechTag = tag ?? null;
        });
    };

    onTTSEnd = () => {
        runInAction(() => {
            this.currentSpeechTag = null;
        });
    };

    addTTSListeners() {
        const speechService = getTTS();
        if (!speechService) return;
        speechService.onStart(this.onTTSStart);
        speechService.onStop(this.onTTSEnd);
    }

    removeTTSListeners() {
        const speechService = getTTS();
        if (!speechService) return;
        speechService.offStart(this.onTTSStart);
        speechService.offStop(this.onTTSEnd);
    }

    onClickSpeak = (vm: QuestionVm) => {
        const speechService = getTTS();
        if (!speechService || !this.cachedVoice) {
            logger.warn("Speech service is not available or voice is not cached.");
            return;
        }
        speechService.speak({
            text: vm.base.question,
            options: { voice: this.cachedVoice },
            tag: this.getSpeechTag(vm),
        });
    };

    onClickStopSpeak() {
        getTTS()?.stop();
    }

    toggleSpeak(vm: QuestionVm) {
        logger.debug("Cliked: toggleSpeak", vm.base.question);
        const speechService = getTTS();
        if (!speechService) return;
        if (this.isSpeaking(vm)) {
            this.onClickStopSpeak();
        } else {
            this.onClickSpeak(vm);
        }
    }

    getSpeechTag(vm: QuestionVm) {
        return "question-" + vm.base.id;
    }


    isSpeaking(vm: QuestionVm) {
        const result = this.currentSpeechTag === this.getSpeechTag(vm);
        return result;
    }

    dispose() {
        this.removeTTSListeners();
    }

    private initQuestionVms(questions: Question[]) {
        const formNodes: QuestionVm[] = [];
        for (const question of questions) {
            const formNode = QuestionVmFactory.create({ question, store: this });
            formNodes.push(formNode);
        }
        this.questions = formNodes;
    }
}
