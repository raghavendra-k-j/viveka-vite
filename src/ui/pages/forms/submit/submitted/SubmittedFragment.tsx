import { CheckCircle2 } from 'lucide-react';
import { useSubmitStore } from '../SubmitContext';
import { AppBar } from '../comp/AppBar';
import AppBarLogo from '~/ui/components/AppBarLogo';
import FilledButton from '~/ui/widgets/button/FilledButton';
import OutlinedButton from '~/ui/widgets/button/OutlinedButton';
import { ProfileView } from '../comp/profile/ProfileView';
import { useViewResponse } from './useViewResponse'; // new hook
import { Card, Title, Message } from './SubmitCommon';

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
            <div className="text-green-600 mb-4">
                <CheckCircle2 size={56} />
            </div>
        </div>
    );
}

function ReturnToHomeButton() {
    return null;
    const store = useSubmitStore();
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

    return (
        <Card>
            <SuccessCheckMark />
            <Title>Assessment Submitted</Title>
            <Message>
                Your responses for&nbsp;
                <span className="font-medium text-default">"{title}"</span>&nbsp;have been successfully submitted.
            </Message>

            <div className="flex flex-col gap-3 mt-8">
                <FilledButton onClick={viewResponse}>View Results</FilledButton>
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
