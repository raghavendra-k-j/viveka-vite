import { useLaTexKbStore } from "./LaTexKbContext";
import { LaTexKbProvider, type LaTexKbProps } from "./LaTexKbProvider";
import { InputView } from "./comp/InputView";
import type { MathfieldElement } from "mathlive";
import { useCallback } from "react";
import { KeyboardContainer } from "./comp/KeyboardConatinerView";

export const LatexKb = (props: LaTexKbProps) => {
  return (
    <LaTexKbProvider props={props}>
      <Body />
    </LaTexKbProvider>
  );
}

function Body() {
  const store = useLaTexKbStore();

  const handleReady = useCallback((mf: MathfieldElement) => {
    store.onMfReady(mf);
  }, [store]);


  return (<div>
    <InputView onReady={handleReady} />
    <KeyboardContainer />
  </div>);
}