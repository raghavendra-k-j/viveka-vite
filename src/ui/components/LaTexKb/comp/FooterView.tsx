import { Check, ChevronLeft, ChevronRight, Delete, Trash2 } from "lucide-react";
import styles from "./../style.module.css";
import type { ReactNode } from "react";
import clsx from "clsx";
import { useLaTexKbStore } from "../LaTexKbContext";

export function FooterView() {
    const store = useLaTexKbStore();
    return (
        <div className={styles.keyboardFooter}>
            <div className={styles.actions}>
                <ActionButton icon={<Trash2 />} onClick={() => store.clear()} />
                <ActionButton icon={<ChevronLeft />} onClick={() => store.navigateLeft()} />
                <ActionButton icon={<ChevronRight />} onClick={() => store.navigateRight()} />
                <ActionButton icon={<Delete />} onClick={() => store.onClickDone()} />
                <DoneButton onClick={() => store.onClickDone()} />
            </div>
        </div>
    );
}

type ActionButtonProps = {
    icon: ReactNode;
    onClick: () => void;
}

function ActionButton(props: ActionButtonProps) {
    return (
        <button className={styles.actionButton} onClick={props.onClick}>
            {props.icon}
        </button>
    );
}


function DoneButton({ onClick }: { onClick?: () => void }) {
    return (
        <button className={clsx(styles.actionButton, styles.actionDone)} onClick={onClick}>
            {<Check size={16} />}
            <span>Done</span>
        </button>
    );
}
