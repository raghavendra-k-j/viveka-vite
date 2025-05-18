import { useParams } from 'react-router';
import { SubmitProvider } from './SubmitProvider';
import { Observer, observer } from 'mobx-react-lite';
import { useSubmitStore } from './SubmitContext';
import { CurrentFragment } from "./models/CurrentFragment";
import { PreviewFragment } from './preview/PreviewFragment';
import { InteractionFragment } from './interaction/InteractionFragment';
import { SubmittedFragment } from './submitted/SubmittedFragment';
import { ErrorView } from './comp/ErrorView';
import { AppBar } from './comp/AppBar';
import AppBarLogo from '~/ui/components/AppBarLogo';
import { ProfileView } from './comp/profile/ProfileView';
import { LoaderView } from '~/ui/widgets/loader/LoaderView';
import { FormAuthFragment } from './auth/FormAuthFragment';

export default function SubmitPage() {
  const urlParams = useParams();
  return (
    <SubmitProvider permalink={urlParams.permalink ?? ''}>
      <CurrentFragmentBody />
    </SubmitProvider>
  );
}

const CurrentFragmentBody = observer(() => {
  const submitStore = useSubmitStore();
  if (submitStore.formDetailState.isLoaded) {
    return <LoadedFragment />;
  }
  else {
    return <NotLoadedFragment />;
  }
});



function NotLoadedFragment() {
  const submitStore = useSubmitStore();
  return (
    <div className='h-screen flex flex-col'>
      <AppBar
        leading={<AppBarLogo />}
        trailing={<ProfileView />}
      />
      <div className='flex-1 flex items-center justify-center'>
        <Observer>
          {() => {
            if (submitStore.formDetailState.isLoading) {
              return (
                <LoaderView />
              );
            }
            else if (submitStore.formDetailState.isError) {
              return <ErrorView />;
            }
            else {
              return <div>Unknown State</div>;
            }
          }}
        </Observer>
      </div>
    </div>
  );
}


function LoadedFragment() {
  const submitStore = useSubmitStore();
  return <Observer>
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
}