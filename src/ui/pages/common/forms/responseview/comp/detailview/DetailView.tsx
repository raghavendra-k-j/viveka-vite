import { useResponseViewStore } from "../../ResponseViewContext";
import { FormInfoData } from "./FormInfoData";
import { ResponseOverview } from "./ResultOverview";
import { QuestionsOverview } from "./QuestionsOverview";
import { UserDetailsView } from "./UserInfoView";

export function DetailView() {
    const store = useResponseViewStore();
    return (
        <div className="flex flex-col bg-slate-50 gap-2 p-4">
            <FormInfoData />
            <div className="flex flex-col gap-4 mt-4">
                <UserDetailsView />
                <ResponseOverview />
                {store.formDetail.type.isAssessment && (<QuestionsOverview />)}
            </div>
        </div>
    );
}
