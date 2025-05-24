export class NumFmt {


    static toNumber(value: string): number | undefined {
        if (value === undefined || value === null || value.trim() === "") {
            return undefined;
        }
        const num = parseFloat(value);
        if (isNaN(num)) {
            return undefined;
        }
        return num;
    }


    static roundToStr(number: number, to: number = 2): string {
        const factor = Math.pow(10, to);
        const roundedNumber = Math.round((number + Number.EPSILON) * factor) / factor;
        return parseFloat(roundedNumber.toString()).toString();
    }

    static padZero(value: number): string {
        if (value < 10 && value > 0) {
            return "0" + value.toString();
        }
        return value.toString();
    }

}
