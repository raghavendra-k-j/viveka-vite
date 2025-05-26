import { Observer } from "mobx-react-lite";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { ChoiceEnAView } from "./ChoiceEnAVm";
import { ObjectiveEnAVm } from "./ObjectiveEnAVm";

export function ObjectiveEnAView(vm: ObjectiveEnAVm) {
    const isMultiple = vm.type.isCheckBoxes;
    const isTrueFalse = vm.type.isTrueFalse;
    return (<>
        <Observer>
            {() => (
                <div className="flex flex-col gap-4 my-2">
                    {vm.choices.map((choice, index) => (
                        <ChoiceEnAView
                            key={index}
                            vm={choice}
                            isCheckbox={isMultiple}
                            index={index}
                            choicesLength={vm.choices.length}
                            onClickControl={(i) => vm.onClickControl(i)}
                            onClickRemove={isTrueFalse ? undefined : (i) => vm.removeChoice(i)}
                            scorable={vm.storeRef.vm.scorable.value.isTrue}
                            placeholder={(index: number) => {
                                if(isTrueFalse) {
                                    return index === 0 ? "True Label" : "False Label";
                                }
                                return `Choice ${index + 1}`;
                            }}
                        />
                    ))}
                </div>
            )}
        </Observer>
        {!isTrueFalse && (
            <div>
                <OutlinedButton size="sm" onClick={() => vm.addChoice()}>
                    Add Choice
                </OutlinedButton>
            </div>
        )}

    </>);


}
