import clsx from 'clsx';
import { QuestionVm } from '../models/QuestionVm';
import styles from './../styles.module.css';



export function QuestionCardView({ children, parent }: { children: React.ReactNode, parent?: QuestionVm }) {
    const resolvedClassName = !parent ? styles.questionCardDefault : styles.questionCardChild;
    return (
        <div className={clsx(styles.questionCard, resolvedClassName)}>
            {children}
        </div>
    );

}