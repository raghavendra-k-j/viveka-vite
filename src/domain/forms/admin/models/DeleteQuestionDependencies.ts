import { JsonObj } from "~/core/types/Json";

export type DeleteQuestionDependenciesProps = {
    hasDependentConditions: boolean;
}

export class DeleteQuestionDependencies {
    public readonly hasDependentConditions: boolean;

    constructor(props: DeleteQuestionDependenciesProps) {
        this.hasDependentConditions = props.hasDependentConditions;
    }

    public static fromMap(map: JsonObj): DeleteQuestionDependencies {
        return new DeleteQuestionDependencies({
            hasDependentConditions: map.hasDependentConditions,
        });
    }
}
