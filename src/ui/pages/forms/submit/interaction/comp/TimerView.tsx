import { observer } from "mobx-react-lite";
import { useInteractionStore } from "../InteractionContext";
import styles from './../styles.module.css';

export const TimerView = observer(() => {
    const store = useInteractionStore();
    const minutes = String(Math.floor((store.remainingSeconds % (60 * 60)) / 60)).padStart(2, '0');
    const seconds = String(store.remainingSeconds % 60).padStart(2, '0');
    return (
        <div className={styles.timer} >
            <span className={styles.timerCount}>{minutes}</span>
            <span> : </span>
            <span className={styles.timerCount}>{seconds}</span>
        </div>
    );
});
