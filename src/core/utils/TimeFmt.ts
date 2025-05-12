export class TimeFmt {


    static format(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const timeParts: string[] = [];

        if (hours > 0) {
            timeParts.push(`${hours}h`);
        }
        if (minutes > 0) {
            timeParts.push(`${minutes}m`);
        }
        if (remainingSeconds > 0 || timeParts.length === 0) {
            timeParts.push(`${remainingSeconds}s`);
        }

        return timeParts.join(' ');
    }

    static formatMinutesSeconds(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }

}
