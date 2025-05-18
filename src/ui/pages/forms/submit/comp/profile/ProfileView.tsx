import { X } from "lucide-react";
import { useAppStore } from "~/ui/pages/_layout/AppContext";
import * as Popover from "@radix-ui/react-popover";
import styles from "./styles.module.css";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";

export const ProfileView = () => {
    return <ProfileMenu />;
};

const ProfileAvatar = ({ name }: { name: string }) => {
    return (
        <div className={styles.avatar}>
            {(name?.charAt(0) ?? "").toUpperCase()}
        </div>
    );
};

const ProfileMenu = () => {
    const appStore = useAppStore();
    if (!appStore.hasUser) {
        return null;
    }

    const user = appStore.appUser;


    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className={styles.triggerButton} aria-label="User Menu">
                    <ProfileAvatar name={user.name} />
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className={styles.popoverContent} sideOffset={14} >
                    <div className={styles.popoverBody}>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.userEmail}>{user.email}</div>
                        <OutlinedButton size="sm" className="mt-4" onClick={() => appStore.logout()}>
                            Logout
                        </OutlinedButton>
                    </div>
                    <Popover.Close className={styles.closeButton} aria-label="Close">
                        <X size={16} />
                    </Popover.Close>
                    <Popover.Arrow className={styles.arrow} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
