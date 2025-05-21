import { AvatarView } from "./AvatarView";
import styles from "./styles.module.css";

export const AppBarProfileAvatar = ({ id, name }: { id: number, name: string }) => {
    return (
        <div className={styles.avatar}>
            <AvatarView id={id} name={name} />
        </div>
    );
};