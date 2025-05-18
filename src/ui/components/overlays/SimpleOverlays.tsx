import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogScaffold
} from "~/ui/widgets/dialogmanager";

export type SimpleOverlayProps = {
    message: string | ReactNode;
};

export function SimpleOverlay({ message }: SimpleOverlayProps) {
    return (
        <Dialog>
            <DialogOverlay />
            <DialogScaffold className="p-4">
                <DialogContent className="p-4">
                    <div className="flex justify-center items-center">
                        <Loader2
                            className="w-8 h-8 animate-spin text-default"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="text-center mt-3 text-default text-sm font-medium">
                        {typeof message === "string" ? (
                            <span>{message}</span>
                        ) : (
                            message
                        )}
                    </div>
                </DialogContent>
            </DialogScaffold>
        </Dialog>
    );
}
