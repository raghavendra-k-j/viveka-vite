import React, { useCallback } from "react";
import { useDialogManager } from "./DialogManagerContext";
import type { DialogEntry } from "./DialogEntry";
import { Dialog, DialogOverlay, DialogScaffold, DialogContent } from "./Dialog";

const DialogManagerTestPage: React.FC = () => {
    const dialogManager = useDialogManager();

    const openRootDialog = useCallback(() => {
        const entry: DialogEntry<RecursiveDialogProps> = {
            id: "recursive-dialog-0",
            component: RecursiveDialog,
            props: {
                level: 0,
                onClose: () => dialogManager.closeById("recursive-dialog-0"),
            },
        };
        dialogManager.show(entry);
    }, [dialogManager]);

    return (
        <div>
            <button onClick={openRootDialog}>Open Infinite Nested Dialog</button>
        </div>
    );
};

export default DialogManagerTestPage;

type RecursiveDialogProps = {
    level: number;
    onClose: () => void;
};

const RecursiveDialog: React.FC<RecursiveDialogProps> = ({ level, onClose }) => {
    const dialogManager = useDialogManager();

    const openNextLevel = () => {
        const nextLevel = level + 1;
        const nextId = `recursive-dialog-${nextLevel}`;
        const entry: DialogEntry<RecursiveDialogProps> = {
            id: nextId,
            component: RecursiveDialog,
            props: {
                level: nextLevel,
                onClose: () => dialogManager.closeById(nextId),
            },
        };
        dialogManager.show(entry);
    };

    return (
        <Dialog>
            <DialogOverlay onClick={onClose} />
            <DialogScaffold>
                <DialogContent>
                    <h2>Dialog Level {level}</h2>
                    <button onClick={openNextLevel}>Open Next Level</button>
                    <button onClick={onClose}>Close</button>
                </DialogContent>
            </DialogScaffold>
        </Dialog>
    );
};
