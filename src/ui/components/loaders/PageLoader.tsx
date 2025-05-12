import { Loader } from "lucide-react";

export function PageLoader() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="animate-spin">
                <Loader />
            </div>
        </div>
    );
}