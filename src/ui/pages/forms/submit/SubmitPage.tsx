import { useParams } from 'react-router';
import { SubmitProvider } from './SubmitProvider';
import { observer } from 'mobx-react-lite';
import { useSubmitStore } from './SubmitContext';
import { CurrentFragment } from "./models/CurrentFragment";
import { PreviewFragment } from './preview/PreviewFragment';
import { InteractionFragment } from './interaction/InteractionFragment';

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

  if (submitStore.formDetailState.isLoading) {
    return <div>Loading...</div>;
  }

  if (submitStore.formDetailState.isError) {
    return <div>Error: {submitStore.formDetailState.error.message}</div>;
  }

  switch (submitStore.currentFragment) {
    case CurrentFragment.Preview:
      return <PreviewFragment />;
    case CurrentFragment.Interaction:
      return <InteractionFragment />;
    case CurrentFragment.AlreadySubmitted:
      return <div>Already Submitted</div>;
    default:
      return <div>Unknown Fragment</div>;
  }
});
