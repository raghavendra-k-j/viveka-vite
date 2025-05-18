import { observer } from "mobx-react-lite";
import { useInteractionStore } from "../InteractionContext";
import { Timer } from "lucide-react";
import styles from "./../styles.module.css";

export const TimerView = observer(() => {
    const store = useInteractionStore();
    const minutes = String(Math.floor((store.remainingSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(store.remainingSeconds % 60).padStart(2, '0');

    return (
        <div className={styles.timer}>
            <Timer strokeWidth={2.5} className={styles.timerIcon} />
            <div className={styles.timerText}>
                <span className={styles.timerNumber}>{minutes}</span>
                <span className={styles.timerColon}>:</span>
                <span className={styles.timerNumber}>{seconds}</span>
            </div>
        </div>
    );
});
