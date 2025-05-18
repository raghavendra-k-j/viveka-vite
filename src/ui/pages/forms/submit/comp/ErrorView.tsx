import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { useSubmitStore } from "../SubmitContext";

export function ErrorView() {
    const store = useSubmitStore();
    const appError = store.formDetailState.error;
    return (<div className="flex flex-col items-center justify-center h-full bg-white">
        <div>{appError.message}</div>
        <div>{appError.description}</div>
        <div>
            <OutlinedButton>
                Retry
            </OutlinedButton>
        </div>
    </div>);

}