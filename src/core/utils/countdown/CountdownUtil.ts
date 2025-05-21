export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export class CountdownUtil {
    static getTimeLeft(targetDate: Date): TimeLeft | null {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();
        if (diff <= 0) return null;
        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        return { days, hours, minutes, seconds };
    }
}