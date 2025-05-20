import { Observer } from "mobx-react-lite";
import { useInteractionStore } from "../InteractionContext";
import type { GroupQuestionVm } from "../models/GroupQuestionVm";
import type { QuestionVm } from "../models/QuestionVm";
import { useMemo } from "react";
import styles from "./../styles.module.css";
import clsx from "clsx";
import { QNumberUtil } from "~/domain/forms/utils/QNumberUtil";


function QuestionIndexItem({
    vm,
    parentVm,
    onClick
}: {
    vm: QuestionVm;
    parentVm?: GroupQuestionVm;
    onClick: (vm: QuestionVm) => void;
}) {
    return (
        <Observer>
            {() => {
                const isAnswered = vm.isAnswered;
                const hasError = vm.hasError;

                const className = clsx(styles.qIndexItem, {
                    [styles.qIndexItemAnswered]: isAnswered && !hasError,
                    [styles.qIndexItemUnanswered]: !isAnswered && !hasError,
                    [styles.qIndexItemError]: hasError,
                });

                const qNumber = parentVm
                    ? QNumberUtil.getQNumberDot(parentVm.base.dOrder, vm.base.dOrder)
                    : QNumberUtil.getQNumberDot(vm.base.dOrder);

                return (
                    <div
                        className={className}
                        onClick={() => onClick(vm)}
                    >
                        {qNumber}
                    </div>
                );
            }}
        </Observer>
    );
}



export type QIndexPanelProps = {
    onClickQuestion: (vm: QuestionVm) => void;
}


export const QIndexPanel = (props: QIndexPanelProps) => {
    const store = useInteractionStore();
    const { questions } = store;

    const acutalQuestions = useMemo(() => {
        const list: { vm: QuestionVm; parentVm?: GroupQuestionVm }[] = [];
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (q.base.type.isGroup) {
                const groupVm = q as GroupQuestionVm;
                if (groupVm.subQuestions && groupVm.subQuestions.length > 0) {
                    for (const subQ of groupVm.subQuestions) {
                        list.push({ vm: subQ, parentVm: groupVm });
                    }
                }
            } else {
                list.push({ vm: q });
            }
        }
        return list;
    }, [questions]);

    return (
        <div className={styles.qIndexPanel}>
            <div className={styles.qIndexPanelTitle}>Questions</div>
            <Legend />
            <div className={styles.qIndexPanelContent}>
                {acutalQuestions.map(({ vm, parentVm }) => (
                    <QuestionIndexItem onClick={props.onClickQuestion} key={vm.base.id} vm={vm} parentVm={parentVm} />
                ))}
            </div>
        </div>
    );
};



const Legend = () => {
    return (
        <div className={styles.qIndexLegend}>
            <LegendItem
                className={clsx(styles.qIndexLegendItemBox, styles.Answered)}
                label="Answered"
            />
            <LegendItem
                className={clsx(styles.qIndexLegendItemBox, styles.Unanswered)}
                label="Unanswered"
            />
            {/* <LegendItem
                className={clsx(styles.qIndexLegendItemBox, styles.Error)}
                label="Error"
            /> */}
        </div>
    );
};

const LegendItem = ({ className, label }: { className: string; label: string }) => {
    return (
        <div className={styles.qIndexLegendItem}>
            <div className={clsx(className)} />
            <span className={styles.qIndexLegendItemText}>{label}</span>
        </div>
    );
};

