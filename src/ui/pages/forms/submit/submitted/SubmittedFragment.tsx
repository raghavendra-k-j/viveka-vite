import { CheckCircle2 } from 'lucide-react';
import { useSubmitStore } from '../SubmitContext';
import { AppBar } from '../comp/AppBar';
import AppBarLogo from '~/ui/components/AppBarLogo';
import FilledButton from '~/ui/widgets/button/FilledButton';
import OutlinedButton from '~/ui/widgets/button/OutlinedButton';

export function SubmittedFragment() {
    return (
        <>
            <AppBar leading={<AppBarLogo />} />
            <Body />
        </>
    );
}

function Body() {
    const store = useSubmitStore();
    return !store.formDetail.type.isSurvey ? <Survey /> : <Assessment />;
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
    const store = useSubmitStore();
    return (
        <OutlinedButton onClick={() => {
            const url = store.returnToHomeURL;
            window.location.href = url;
        }}>
            Return to Home
        </OutlinedButton>
    );
}

function Title({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-lg font-semibold text-default mb-2 text-center">
            {children}
        </h1>
    );
}

function Message({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-secondary text-base-m mt-2 text-center">
            {children}
        </p>
    );
}

function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-4 sm:pt-16 flex justify-center items-start">
            <div className="bg-surface shadow-sm rounded-sm p-6 w-full max-w-md text-center">
                {children}
            </div>
        </div>
    );
}

function Assessment() {
    const store = useSubmitStore();
    const title = store.formDetail.title;

    return (
        <Card>
            <SuccessCheckMark />

            <Title>Assessment Submitted</Title>

            <Message>
                Your responses for&nbsp;
                <span className="font-medium text-default">"{title}"</span> have been successfully submitted.
            </Message>

            <div className="flex flex-col gap-3 mt-8">
                <FilledButton>
                    View Results
                </FilledButton>
                <ReturnToHomeButton />
            </div>
        </Card>
    );
}

function Survey() {
    const store = useSubmitStore();
    const title = store.formDetail.title;

    return (
        <Card>
            <SuccessCheckMark />

            <Title>Thank You for Your Response</Title>

            <Message>
                Your response to&nbsp;
                <span className="font-medium text-default">"{title}"</span> has been successfully recorded.
            </Message>

            <div className="flex flex-col gap-3 mt-8">
                <FilledButton>
                    View Response
                </FilledButton>
                {store.hasBackNavigation && <ReturnToHomeButton />}
            </div>
        </Card>
    );
}
