import { action, makeObservable, observable } from "mobx";
import { Observer } from "mobx-react-lite";
import { createContext, createRef, useContext, useEffect, useRef } from "react";
import { logger } from "~/core/utils/logger";
import { STT } from "~/infra/utils/stt/STT";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";
import { RichPmEditor, RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";
import FilledButton from "~/ui/widgets/button/FilledButton";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { InstanceId } from "~/core/utils/InstanceId";



const HomeContext = createContext<HomeStore | null>(null);

const useHomeStore = () => {
  const store = useContext(HomeContext);
  if (!store) {
    throw new Error("useHomeStore must be used within a HomeProvider");
  }
  return store;
}

class InputItem {

  ref: React.RefObject<RichPmEditorRef | null>;
  id: string = InstanceId.generate("InputItem");
  node: ProseMirrorNode | null;

  constructor() {
    this.ref = createRef<RichPmEditorRef>();
    this.node = null;
  }

  onNewNode(node: ProseMirrorNode) {
    this.node = node;
    logger.debug(this.id, node);
  }


}


class HomeStore {



  inputs: InputItem[] = [];
  stt: STT;

  constructor() {
    this.stt = new STT();
    makeObservable(this, {
      inputs: observable.shallow,
      addInput: action,
      removeInput: action
    });
  }


  setContent(item: InputItem): void {
    if (item.node) {
      logger.debug(item.id, "Set Content: Has Node", item.node);
      item.ref.current?.setContent(item.node);
    }
    else {
      logger.debug("Set Content: No Node", item.node);
    }
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



function HomeProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<HomeStore>(new HomeStore());
  return (
    <HomeContext.Provider value={storeRef.current}>
      {children}
    </HomeContext.Provider>
  );
}

export default function HomePage() {
  return (
    <HomeProvider>
      <HomeInner />
    </HomeProvider>
  );
}

function HomeInner() {
  const store = useHomeStore();
  return (
    <div>
      <Observer>
        {() => (
          <div className="flex flex-col gap-4 p-4">
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
  const store = useHomeStore();

  useEffect(() => {
    const ref = item.ref.current;
    if (!ref) {
      logger.debug(item.id, "No Reference: ")
      return;
    }
    if (item.node) {
      ref.setContent(item.node)
      logger.debug(item.id, "useEffect: Has Node", item.node);
    }
    else {
      logger.debug(item.id, "useEffect: No Node", item.node);
    }

    const onChange = (node: ProseMirrorNode) => {
      item.onNewNode(node);
    };

    ref.addChangeListener(onChange);
    return () => {
      ref.removeChangeListener(onChange);
    };
  }, [item]);

  return (<div>
    <RichPmEditor
      ref={item.ref}
      stt={store.stt}
      schema={blockSchema}
      initialContent={item.node || undefined}
    />
    <button className="btn" onClick={() => store.setContent(item)}>Set</button>
    <button className="btn" onClick={() => store.removeInput(item)}>Remove</button>
  </div>);
}