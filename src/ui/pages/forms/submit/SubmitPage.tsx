import { useParams } from 'react-router';
import { SubmitProvider } from './SubmitProvider';
import { Observer } from 'mobx-react-lite';
import { useSubmitStore } from './SubmitContext';
import { CurrentFragment } from './models/CurrentFragment';
import { AppBar } from './comp/AppBar';
import AppBarLogo from '~/ui/components/AppBarLogo';
import { ProfileView } from './comp/profile/ProfileView';
import { LoaderView } from '~/ui/widgets/loader/LoaderView';
import { PreviewFragment } from './preview/PreviewFragment';
import { InteractionFragment } from './interaction/InteractionFragment';
import { SubmittedFragment } from './submitted/SubmittedFragment';
import { FormAuthFragment } from './auth/FormAuthFragment';
import { ErrorViewBody } from './comp/ErrorViewBody';
import { UnknowStateView } from '~/ui/components/errors/UnknowStateView';

export default function SubmitPage() {
  const { permalink = '' } = useParams<{ permalink?: string }>();
  return (
    <SubmitProvider permalink={permalink}>
      <SubmitPageContent />
    </SubmitProvider>
  );
}

function SubmitPageContent() {
  const submitStore = useSubmitStore();

  return (
    <Observer>
      {() => {
        if (!submitStore.formDetailState.isData) {
          return <LoadingOrErrorView />;
        }
        return <ActiveFragment />;
      }}
    </Observer>
  );
}

function LoadingOrErrorView() {
  const submitStore = useSubmitStore();

  return (
    <div className="h-screen flex flex-col">
      <AppBar leading={<AppBarLogo />} trailing={<ProfileView />} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <Observer>
          {() => {
            if (submitStore.formDetailState.isInitOrLoading) {
              return (
                <div className="h-full flex items-center justify-center">
                  <LoaderView />
                </div>
              );
            } else if (submitStore.formDetailState.isError) {
              return (
                <div className="max-w-xl mx-auto flex min-h-full flex-col items-center justify-center p-4 text-center">
                  <ErrorViewBody />
                </div>
              );
            } else {
              return <UnknowStateView />;
            }
          }}
        </Observer>
      </main>
    </div>
  );
}

function ActiveFragment() {
  const submitStore = useSubmitStore();

  return (
    <Observer>
      {() => {
        switch (submitStore.currentFragment) {
          case CurrentFragment.Preview:
            return <PreviewFragment />;
          case CurrentFragment.Interaction:
            return <InteractionFragment />;
          case CurrentFragment.AlreadySubmitted:
            return <SubmittedFragment />;
          case CurrentFragment.Auth:
            return <FormAuthFragment />;
          default:
            return <div>Unknown Fragment</div>;
        }
      }}
    </Observer>
  );
}
