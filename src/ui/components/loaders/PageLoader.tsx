import { LoaderView } from "~/ui/widgets/loader/LoaderView";

export function PageLoader() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <LoaderView />
        </div>
    );
}