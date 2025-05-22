import { CheckCircle2, Hourglass } from 'lucide-react';
import { useSubmitStore } from '../SubmitContext';
import { AppBar } from '../comp/AppBar';
import AppBarLogo from '~/ui/components/AppBarLogo';
import FilledButton from '~/ui/widgets/button/FilledButton';
import OutlinedButton from '~/ui/widgets/button/OutlinedButton';
import { ProfileView } from '../comp/profile/ProfileView';
import { useViewResponse } from './useViewResponse';
import { Card, Title, Message } from './SubmitCommon';
import { BasicBanner } from '~/ui/widgets/banner/BasicBanner';

export function SubmittedFragment() {
    return (
        <>
            <AppBar leading={<AppBarLogo />} trailing={<ProfileView />} />
            <Body />
        </>
    );
}

function Body() {
    const store = useSubmitStore();
    return store.formDetail.type.isSurvey ? <Survey /> : <Assessment />;
}

function SuccessCheckMark() {
    return (
        <div className="flex items-center justify-center">
            <div className="text-emerald-600 mb-4">
                <CheckCircle2 size={56} />
            </div>
        </div>
    );
}

function ReturnToHomeButton() {
    const store = useSubmitStore();
    if (!store.hasBackNavigation) {
        return null;
    }
    return (
        <OutlinedButton onClick={() => (window.location.href = store.returnToHomeURL)}>
            Return to Home
        </OutlinedButton>
    );
}

function Assessment() {
    const store = useSubmitStore();
    const title = store.formDetail.title;
    const viewResponse = useViewResponse();
    const isEvaluated = store.formDetail.formResponse!.isEvaluated;

    return (
        <Card>
            <SuccessCheckMark />
            <Title>Assessment Submitted</Title>
            <Message>
                Your responses for&nbsp;
                <span className="font-medium text-default">"{title}"</span>&nbsp;have been successfully submitted.
            </Message>

            {!isEvaluated && (
                <BasicBanner
                    className="mt-4"
                    variant="info"
                    icon={<Hourglass size={16} />}
                    message="Assessment is under evaluation"
                    description="We’re currently evaluating your submission. You’ll be notified once the results are available."
                />
            )}

            <div className="flex flex-col gap-3 mt-8">
                <FilledButton onClick={viewResponse} disabled={!isEvaluated}>
                    View Response
                </FilledButton>
                <ReturnToHomeButton />
            </div>
        </Card>
    );
}


function Survey() {
    const store = useSubmitStore();
    const title = store.formDetail.title;
    const viewResponse = useViewResponse();

    return (
        <Card>
            <SuccessCheckMark />
            <Title>Thank You for Your Response</Title>
            <Message>
                Your response to&nbsp;
                <span className="font-medium text-default">"{title}"</span>&nbsp;has been successfully recorded.
            </Message>

            <div className="flex flex-col gap-3 mt-8">
                <FilledButton onClick={viewResponse}>View Response</FilledButton>
                {store.hasBackNavigation && <ReturnToHomeButton />}
            </div>
        </Card>
    );
}
