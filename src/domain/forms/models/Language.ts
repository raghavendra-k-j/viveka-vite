import { JsonObj } from "~/core/types/Json";


export class Language {

    id: string;
    name: string;
    translateCode: string;
    ttsCode: string;

    constructor({
        id,
        name,
        translateCode,
        ttsCode
    }: {
        id: string;
        name: string;
        translateCode: string;
        ttsCode: string;
    }) {
        this.id = id;
        this.name = name;
        this.translateCode = translateCode;
        this.ttsCode = ttsCode;
    }

    static fromJson(json: JsonObj): Language {
        return new Language({
            id: json.id,
            name: json.name,
            translateCode: json.translateCode,
            ttsCode: json.ttsCode
        });
    }
}
