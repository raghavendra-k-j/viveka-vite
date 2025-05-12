export class NumFmt {
    
    static roundToStr(number: number, to: number = 2): string {
        const factor = Math.pow(10, to);
        const roundedNumber = Math.round((number + Number.EPSILON) * factor) / factor;
        return parseFloat(roundedNumber.toString()).toString();
    }
}
