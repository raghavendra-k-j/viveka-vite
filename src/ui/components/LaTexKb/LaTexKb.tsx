import { useLaTexKbStore } from "./LaTexKbContext";
import { LaTexKbProvider, type LaTexKbProps } from "./LaTexKbProvider";
import { InputView } from "./comp/InputView";
import type { MathfieldElement } from "mathlive";
import { useCallback } from "react";
import { KeyboardContainer } from "./comp/KeyboardConatinerView";
import { Dialog, DialogContent, DialogOverlay, DialogScaffold } from "~/ui/widgets/dialogmanager";
import { X } from "lucide-react";

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
    <Dialog>
      <DialogOverlay />
      <DialogScaffold className="px-4">
        <DialogContent className="max-w-[776px] w-full">
          <div className="flex items-center justify-between bg-surface border-b border-slate-200 px-3 py-2 font-semibold rounded-t-sm">
            <span>Math Equation</span>
            <button
              type="button"
              onClick={() => store.onClickClose()}
              className="p-1 rounded hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X />
            </button>
          </div>
          <InputView onReady={handleReady} stt={store.stt} />
          <KeyboardContainer />
        </DialogContent>
      </DialogScaffold>
    </Dialog>
  </div>);
}