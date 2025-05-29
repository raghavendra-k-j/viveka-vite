import { observer } from "mobx-react-lite";
import { ArrowLeft } from "lucide-react";
import { useInteractionStore } from "../InteractionContext";
import { TimerView } from "./TimerView";
import clsx from "clsx";
import styles from "./../../style.module.css";
import { ProfileView } from "../../comp/profile/ProfileView";

export const AppBarView = observer(() => {
    return (
        <div
            className={clsx(
                styles.appbar,
                "flex items-center justify-between gap-3 shadow-sm min-h-[48px] px-4 py-2 text-on-primary"
            )}
        >
            <AppBarLeading />
            <AppBarTrailing />
        </div>
    );
});

const AppBarLeading = observer(() => {
    const store = useInteractionStore();

    const handleOnBack = () => {
        store.onExitForm();
    };

    return (
        <div className="flex items-center gap-4 min-w-0">
            <button onClick={handleOnBack}>
                <ArrowLeft size={24} />
            </button>
            <span className="text-base-m font-medium truncate whitespace-nowrap overflow-hidden">
                {store.formDetail.title}
            </span>
        </div>
    );
});

const AppBarTrailing = observer(() => {
    const store = useInteractionStore();
    return (
        <div className="flex items-center gap-3">
            {store.vmState.isData && store.hasTimeLimit && <TimerView />}
            <ProfileView />
        </div>
    );
});

