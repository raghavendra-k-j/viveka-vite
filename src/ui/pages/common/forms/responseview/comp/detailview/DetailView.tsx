import { useResponseViewStore } from "../../ResponseViewContext";
import { FormInfoData } from "./FormInfoData";
import { ResponseOverview } from "./ResultOverview";
import { QuestionsOverview } from "./QuestionsOverview";
import { UserDetailsView } from "./UserInfoView";

export function DetailView() {
    const store = useResponseViewStore();
    return (
        <div className="flex flex-col bg-slate-50 gap-4 p-4">
            <FormInfoData />
            {store.showUserDetail && (
                <UserDetailsView />)}
            <ResponseOverview />
            {store.formDetail.type.isAssessment && (<QuestionsOverview />)}
        </div>
    );
}
