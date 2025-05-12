export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
}

class Logger {
    private static instance: Logger;
    private logLevel: LogLevel = LogLevel.DEBUG;

    public constructor(public readonly tag?: string) { }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    private shouldLog(level: LogLevel): boolean {
        const order = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
        return order.indexOf(level) <= order.indexOf(this.logLevel);
    }

    private format(level: LogLevel, ...args: unknown[]): string {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
        return prefix + ' ' + args.map(String).join(' ');
    }

    public info(...args: unknown[]): void {
        if (this.shouldLog(LogLevel.INFO)) console.log(this.format(LogLevel.INFO, ...args));
    }

    public warn(...args: unknown[]): void {
        if (this.shouldLog(LogLevel.WARN)) console.warn(this.format(LogLevel.WARN, ...args));
    }

    public error(...args: unknown[]): void {
        if (this.shouldLog(LogLevel.ERROR)) console.error(this.format(LogLevel.ERROR, ...args));
    }

    public debug(...args: unknown[]): void {
        if (this.shouldLog(LogLevel.DEBUG)) console.debug(this.format(LogLevel.DEBUG, ...args));
    }
}

const logger = Logger.getInstance();

export { Logger, logger };
