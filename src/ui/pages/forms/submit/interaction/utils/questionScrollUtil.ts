import { QuestionVm } from "../models/QuestionVm";

export function scrollToQuestion(vm: QuestionVm) {
    const container = document.getElementById('questions-container');
    const questionEl = document.getElementById(`question-${vm.base.id}`);
    if (container && questionEl) {
        const containerTop = container.getBoundingClientRect().top;
        const questionTop = questionEl.getBoundingClientRect().top;
        const marginTop = 16;
        const scrollOffset = questionTop - containerTop + container.scrollTop - marginTop;
        container.scrollTo({
            top: scrollOffset,
            behavior: 'smooth'
        });
    }
}
