import { FormDetailSection, InfoBox } from "./FormDetailComponent";

export const LeftSidebar = () => {
    return (
        <div className="bg-surface max-w-[300px] border-r shadow-sm border-slate-200 p-4 flex flex-col gap-4 h-full overflow-y-auto">
            <FormDetailSection />
            <InfoBox />
        </div>
    );
};
