import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { RDQuestionsReqFilter } from "~/domain/forms/models/RDQuestionsReq";
import { useResponseViewStore } from "../../ResponseViewContext";
import { useEnableDragScroll } from "~/ui/hooks/useEnableDragScroll";
import styles from "./../styles.module.css";
import clsx from "clsx";

export const FilterBar = observer(function FilterBar() {
    const store = useResponseViewStore();
    const filters = store.formDetail.type.isAssessment ? RDQuestionsReqFilter.assessmentValues : RDQuestionsReqFilter.surveyValues;

    const activeFilter = store.questionFilter;

    const scrollRef = useRef<HTMLDivElement>(null);
    useEnableDragScroll(scrollRef);

    return (
        <div
            ref={scrollRef}
            className={styles.filterBar}
        >
            {filters.map((filter) => (
                <FilterChip
                    key={filter.type}
                    filter={filter}
                    active={activeFilter?.type === filter.type}
                    onClick={() => store.applyQuestionsFilter(filter)}
                />
            ))}
        </div>
    );
});

const FilterChip = observer(function FilterChip({
    filter,
    active,
    onClick,
}: {
    filter: RDQuestionsReqFilter;
    active?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(styles.filterChip, { [styles.active]: active, })}>
            {filter.name}
        </button>
    );
});
