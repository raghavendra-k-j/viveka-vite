import { action, makeObservable, observable } from "mobx";
import { Observer } from "mobx-react-lite";
import { createContext, createRef, useContext, useRef } from "react";
import { logger } from "~/core/utils/logger";
import { UUIDUtil } from "~/core/utils/UUIDUtil";
import FilledButton from "~/ui/widgets/button/FilledButton";


const LiveInputsDemoContext = createContext<LiveInputsDemoStore | null>(null);

const useLiveInputsDemoStore = () => {
  const store = useContext(LiveInputsDemoContext);
  if (!store) {
    throw new Error("useLiveInputsDemoStore must be used within a LiveInputsDemoProvider");
  }
  return store;
}

class InputItem {
  ref: React.RefObject<HTMLInputElement | null>;
  id: string = UUIDUtil.compact;

  constructor() {
    this.ref = createRef<HTMLInputElement>();
  }
}


class LiveInputsDemoStore {

  inputs: InputItem[] = [];

  constructor() {
    makeObservable(this, {
      inputs: observable.shallow,
      addInput: action,
      removeInput: action
    });
  }


  addInput() {
    const newInput = new InputItem();
    this.inputs.push(newInput);
    logger.debug("Total Inputs", this.inputs.length)
  }

  removeInput(item: InputItem) {
    const index = this.inputs.findIndex((e) => item.id === e.id);
    if (index == -1) return;
    this.inputs.splice(index, 1);
  }
}



function LiveInputsDemoProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<LiveInputsDemoStore>(new LiveInputsDemoStore());
  return (
    <LiveInputsDemoContext.Provider value={storeRef.current}>
      {children}
    </LiveInputsDemoContext.Provider>
  );
}

export default function LiveInputsDemoPage() {
  return (
    <LiveInputsDemoProvider>
      <LiveInputsDemoInner />
    </LiveInputsDemoProvider>
  );
}

function LiveInputsDemoInner() {
  const store = useLiveInputsDemoStore();
  return (
    <div>
      <Observer>
        {() => (
          <div className="flex flex-col">
            {store.inputs.map((e) => (
              <InputView key={e.id} item={e} />
            ))}
          </div>
        )}
      </Observer>
      <div>
        <FilledButton onClick={() => store.addInput()}>Add</FilledButton>
      </div>
    </div>
  );
}

export function InputView({ item }: { item: InputItem }) {
  const store = useLiveInputsDemoStore();
  return (<div>
    <input ref={item.ref} placeholder={`Placeholder ${item.id}`} />
    <button onClick={() => store.removeInput(item)}>Remove</button>
  </div>);
}