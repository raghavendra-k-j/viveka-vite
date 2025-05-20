export class NumFmt {


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
