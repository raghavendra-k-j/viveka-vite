import { RichPmEditor } from "~/ui/components/richpmeditor/RichPmEditor";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { EnAVm, EnAVmProps } from "./EnAVmBase";
import { Answer, FillBlankInputAnswer, FillBlanksAnswer } from "~/domain/forms/models/answer/Answer";
import { FillBlankInput, FillBlanksQExtras, QExtras } from "~/domain/forms/models/question/QExtras";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { Observer } from "mobx-react-lite";
import { makeObservable, observable, reaction } from "mobx";
import { useEffect } from "react";
import { PmToHtml } from "~/ui/components/richpmeditor/utils/PmToHtml";
import { Question } from "~/domain/forms/admin/models/Question";
import { FillBlankEnAVmItem } from "./FillBlankEnAVmItem";
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";


export type FillBlankEnAVmProps = EnAVmProps & {

}

export class FillBlankEnAVm extends EnAVm {
    items: FillBlankEnAVmItem[];

    constructor(props: FillBlankEnAVmProps) {
        super(props);
        this.items = [];
        this.addListenerForQuestionChange();
        makeObservable(this, {
            items: observable.shallow,
        });
    }

    addListenerForQuestionChange() {
        reaction(
            () => this.storeRef.qvmState.data?.questionNode,
            (node) => {
                this.syncBlanks(node || null);
            }
        );
    }

    syncBlanks(node: ProseMirrorNode | null) {
        if (!node) {
            this.clearItems();
        }
        else {
            const totalBlanks = this.countBlanks(node);
            if (totalBlanks === this.items.length) {
                return;
            }
            if (totalBlanks < this.items.length) {
                this.items.splice(totalBlanks);
            }
            else {
                const newItemsCount = totalBlanks - this.items.length;
                for (let i = 0; i < newItemsCount; i++) {
                    const newItem = new FillBlankEnAVmItem({
                        node: null,
                    });
                    this.items.push(newItem);
                }
            }
        }
    }


    countBlanks(node: ProseMirrorNode) {
        let count = 0;
        node.descendants((e) => {
            if (e.type.name === "fillBlank") {
                count++;
            }
            return true;
        });
        return count;
    }


    clearItems() {
        this.items = [];
    }


    getQExtra(): QExtras | null {
        if (this.items.length === 0) {
            return null;
        }
        const inputs: FillBlankInput[] = [];
        for (let i = 1; i <= this.items.length; i++) {
            const inputItem = new FillBlankInput({ id: i });
            inputs.push(inputItem);
        }
        return new FillBlanksQExtras({ inputs: inputs, });
    }

    getAnswer(): Answer | null {
        if (this.items.length === 0) {
            return null;
        }
        const ansInputs: FillBlankInputAnswer[] = [];
        for (let i = 1; i <= this.items.length; i++) {
            const item = this.items[i - 1];
            let ansString = "";
            if (item.node) {
                ansString = PmToHtml.convert(item.node, inlineSchema);
            }
            ansInputs.push(new FillBlankInputAnswer({ id: i, answer: ansString }));
        }
        return new FillBlanksAnswer({ answers: ansInputs });
    }



    static empty({ storeRef }: { storeRef: UpsertQuestionStore }): FillBlankEnAVm {
        return new FillBlankEnAVm({
            storeRef: storeRef,
        });
    }

    static fromQuestion(props: { question: Question; storeRef: UpsertQuestionStore; }): EnAVm | null {
        const qExtras = props.question.qExtras as FillBlanksQExtras;
        const answer = props.question.answer as FillBlanksAnswer;
        const vm = new FillBlankEnAVm({
            storeRef: props.storeRef,
        });

        const inputs: FillBlankEnAVmItem[] = [];
        const answerToIdMap = answer.toIdMap();

        for (const input of qExtras.inputs) {
            const item = new FillBlankEnAVmItem({
                node: PmConverter.toNode({
                    text: answerToIdMap[input.id]!,
                    schema: inlineSchema,
                }),
            });
            inputs.push(item);
        }

        return vm;
    }


    render(): React.ReactNode {
        return FillBlankEnAVmView(this);
    }


}



export function FillBlankEnAVmView(vm: FillBlankEnAVm) {
    return (<Observer>
        {() => <div className="flex flex-col gap-2">
            {vm.items.map((e) => <FillBlankInputView key={e.uid} vm={vm} item={e} />)}
        </div>}
    </Observer>);
}


type FillBlankInputProps = {
    vm: FillBlankEnAVm;
    item: FillBlankEnAVmItem;
}


function FillBlankInputView(props: FillBlankInputProps) {
    useEffect(() => {
        const editor = props.item.ref.current;
        if (!editor) return;
        function handleNodeChange(node: ProseMirrorNode | null) {
            props.item.onNodeChanged(node);
        }
        editor.addChangeListener(handleNodeChange);
        return () => {
            editor.removeChangeListener(handleNodeChange);
        }
    }, [props])

    return (<div>
        <RichPmEditor
            ref={props.item.ref}
            stt={props.vm.storeRef.stt}
            schema={inlineSchema}
            initialContent={props.item.node}
        />
    </div>);
}