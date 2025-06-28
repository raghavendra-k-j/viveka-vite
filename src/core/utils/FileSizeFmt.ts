export class FileSizeFmt {
   
    static sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    static humanReadable(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = bytes / Math.pow(k, i);
        let formatted = i === 0 ? value.toString() : value.toFixed(2);
        if (formatted.endsWith('.00')) {
            formatted = formatted.slice(0, -3);
        }
        return `${formatted} ${FileSizeFmt.sizes[i]}`;
    }

    static mbToHumanReadable(mb: number): string {
        const bytes = mb * 1024 * 1024;
        return FileSizeFmt.humanReadable(bytes);
    }

    static mbToBytes(mb: number): number {
        return mb * 1024 * 1024;
    }

}
