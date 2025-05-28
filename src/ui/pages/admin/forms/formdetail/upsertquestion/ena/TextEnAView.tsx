import { Observer } from "mobx-react-lite";
import { inlineSchema, blockSchema } from "~/ui/components/richpmeditor/pm/schema";
import { RichPmEditor } from "~/ui/components/richpmeditor/RichPmEditor";
import { FError } from "~/ui/widgets/form/FError";
import { FLabel } from "~/ui/widgets/form/FLabel";
import { FFieldContainer } from "~/ui/widgets/form/input/FFieldContainer";
import { TextEnAVm } from "./TextEnAVm";

export function TextEnAView(vm: TextEnAVm) {
    return (
        <Observer>
            {() => {
                if (vm.storeRef.vm.scorable.value.isNotTrue) {
                    return null;
                }
                return (
                    <div>
                        <FFieldContainer>
                            <FLabel>Answer</FLabel>
                            <RichPmEditor
                                placeholder="Enter Correct Answer"
                                stt={vm.storeRef.stt}
                                ref={vm.editorRef}
                                initialContent={vm.node}
                                schema={vm.type.isTextBox ? inlineSchema : blockSchema}
                                minHeight={vm.type.isTextArea ? "80px" : ""}
                            />
                            <FError></FError>
                        </FFieldContainer>
                    </div>
                );
            }}
        </Observer>
    );
}