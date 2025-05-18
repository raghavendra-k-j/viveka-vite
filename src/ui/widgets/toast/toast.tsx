import { toast } from "react-toastify";
import { ToastView, ToastViewProps } from "./ToastView";

export function showErrorToast(props: ToastViewProps) {
    toast.dismiss();
    toast.error(
        <ToastView {...props} />, {
            icon: false,
        }
    );
}