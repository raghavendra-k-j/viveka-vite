export class FillBlankToHtmlConverter {
    static regex = /\[_+]/g;

    static convert(text: string): string {
        return text.replace(this.regex, (match) => {
            const spaceCount = match.length - 2;
            const width = spaceCount * 14;
            return `<span style="display:inline-block; border-bottom:1px solid; width:${width}px;"></span>`;
        });
    }
}
