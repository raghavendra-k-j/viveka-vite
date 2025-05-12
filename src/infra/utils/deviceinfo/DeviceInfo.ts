export enum Browser {
    Chrome = 'Chrome',
    Firefox = 'Firefox',
    Safari = 'Safari',
    Edge = 'Edge',
    InternetExplorer = 'Internet Explorer',
    Unknown = 'Unknown'
}

export enum OS {
    Windows = 'Windows',
    MacOS = 'MacOS',
    Linux = 'Linux',
    Android = 'Android',
    iOS = 'iOS',
    Unknown = 'Unknown'
}

export type DeviceInfoProps = {
    userAgent: string;
    browser: Browser;
    os: OS;
}

export class DeviceInfo {
    userAgent: string;
    browser: Browser;
    os: OS;

    constructor({ userAgent, browser, os }: DeviceInfoProps) {
        this.userAgent = userAgent;
        this.browser = browser;
        this.os = os;
    }
}

