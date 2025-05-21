import { AppBar } from "../comp/AppBar";
import AppBarLogo from "~/ui/components/AppBarLogo";
import { ProfileView } from "../comp/profile/ProfileView";
import { useSubmitStore } from "../SubmitContext";
import { ReadMoreText } from "~/ui/widgets/text/ReadMoreText";
import { SelectLanguageInput } from "./SelectLanguageInput";
import { DetailView } from "./DetailView";
import FilledButton from "~/ui/widgets/button/FilledButton";
import { ClosedInfoView, NotStartedInfoView } from "./NotStartedInfoView";


export function PreviewFragment() {
    return (
        <div className="flex flex-col h-screen">
            <AppBar leading={<AppBarLogo />} trailing={<ProfileView />} />
            <main className="flex justify-center overflow-y-auto p-4 sm:p-6">
                <MainCard />
            </main>
        </div>
    );
}

function MainCard() {
    const store = useSubmitStore();
    const { formDetail } = store;

    return (
        <div className="flex flex-col bg-surface border border-default rounded-sm shadow-md max-w-xl w-full min-h-fit">
            <Header title={formDetail.title} description={formDetail.description} />
            <DetailView formDetail={formDetail} />
            <Footer />
        </div>
    );
}

function Header({ title, description }: { title: string; description?: string }) {
    return (
        <div className="flex flex-col p-4">
            <ReadMoreText text={title} maxChars={120} className="font-semibold text-base text-default" />
            {description && (
                <ReadMoreText text={description} maxChars={120} className="text-secondary text-sm mt-1" />
            )}
        </div>
    );
}

function Footer() {
    const store = useSubmitStore();
    const buttonText = "Start " + store.formDetail.type.name;
    const now = new Date();
    const startDate = store.formDetail.startDate;
    const endDate = store.formDetail.endDate;

    const hasNotStarted = startDate > now;
    const hasEnded = endDate < now;

    return (
        <div className="flex flex-col p-4 border-t border-default bg-slate-50 gap-4">
            {hasNotStarted && <NotStartedInfoView />}
            {hasEnded && <ClosedInfoView />}
            {store.formDetail.languages.length > 0 && !hasEnded && <SelectLanguageInput />}
            {!hasNotStarted && !hasEnded && (
                <FilledButton onClick={() => store.onClickStart()}>{buttonText}</FilledButton>
            )}
        </div>
    );
}
