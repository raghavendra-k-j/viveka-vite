export type LanguageJson = {
    id: string;
    name: string;
    translateCode: string;
    ttsCode: string;
};

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

    serialize(): LanguageJson {
        return {
            id: this.id,
            name: this.name,
            translateCode: this.translateCode,
            ttsCode: this.ttsCode
        };
    }

    static deserialize(json: LanguageJson): Language {
        return new Language({
            id: json.id,
            name: json.name,
            translateCode: json.translateCode,
            ttsCode: json.ttsCode
        });
    }
}
