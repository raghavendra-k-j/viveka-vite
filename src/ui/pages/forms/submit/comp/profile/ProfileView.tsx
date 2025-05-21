import { X } from "lucide-react";
import { useAppStore } from "~/ui/pages/_layout/AppContext";
import * as Popover from "@radix-ui/react-popover";
import styles from "./styles.module.css";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { AppBarProfileAvatar } from "~/ui/components/avatar/AppBarProfileAvatar";
import { AvatarView } from "~/ui/components/avatar/AvatarView";

export const ProfileView = () => {
    return <ProfileMenu />;
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
                    <AppBarProfileAvatar id={user.id} name={user.name} />
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className={styles.popoverContent} sideOffset={14} >
                    <div className={styles.popoverBody}>
                        <div>
                            <div className="flex justify-center">
                                <div className="w-10 h-10">
                                    <AvatarView id={user.id} name={user.name} fontSize={24} />
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <div className={styles.userName}>{user.name}</div>
                                <div className={styles.userEmail}>{user.email}</div>
                            </div>
                        </div>
                        <OutlinedButton size="sm" className="mt-4" onClick={() => appStore.logoutAndGoToLogin()}>
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
