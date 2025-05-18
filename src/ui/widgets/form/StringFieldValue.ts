import { FieldValue } from "./FieldValue";

export class StringFieldValue extends FieldValue<string> {
    constructor(initialValue = "") {
        super(initialValue);
    }
}