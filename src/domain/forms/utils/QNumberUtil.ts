export class QNumberUtil {

    static getQNumber(qNumber: number, subQNumber?: number): string {
        if (subQNumber) {
            return `${qNumber} (${QNumberUtil.getLetterFromNumber(subQNumber)})`;
        }
        return `${qNumber}`;
    }

    static getQNumberDot(qNumber: number, subQNumber?: number): string {
        if (subQNumber) {
            return `${qNumber}.${QNumberUtil.getLetterFromNumber(subQNumber)}`;
        }
        return `${qNumber}`;
    }


    static getLetterFromNumber(num: number): string {
        const charCode = 97 + num - 1;
        return String.fromCharCode(charCode);
    }
}