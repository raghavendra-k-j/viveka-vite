import { QuestionVm } from "../models/QuestionVm";

export const scrollToQuestion = (vm: QuestionVm) => {
    const el = document.getElementById(`question-${vm.base.id}`);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}