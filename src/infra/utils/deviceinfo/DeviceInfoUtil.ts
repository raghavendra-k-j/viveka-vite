import { DeviceInfo, Browser, OS } from "./DeviceInfo";

export class DeviceInfoUtil {
    static getDeviceInfo(): DeviceInfo {
        const userAgent = DeviceInfoUtil.getUserAgent();
        const browser = DeviceInfoUtil.getBrowser(userAgent);
        const os = DeviceInfoUtil.getOS(userAgent);

        return new DeviceInfo({ userAgent, browser, os });
    }

    private static getUserAgent(): string {
        return navigator.userAgent;
    }

    private static getBrowser(userAgent: string): Browser {
        if (userAgent.includes('Chrome')) {
            return Browser.Chrome;
        } else if (userAgent.includes('Firefox')) {
            return Browser.Firefox;
        } else if (userAgent.includes('Safari')) {
            return Browser.Safari;
        } else if (userAgent.includes('Edge')) {
            return Browser.Edge;
        } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
            return Browser.InternetExplorer;
        } else {
            return Browser.Unknown;
        }
    }

    private static getOS(userAgent: string): OS {
        if (userAgent.includes('Win')) {
            return OS.Windows;
        } else if (userAgent.includes('Mac')) {
            return OS.MacOS;
        } else if (userAgent.includes('Linux')) {
            return OS.Linux;
        } else if (userAgent.includes('Android')) {
            return OS.Android;
        } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
            return OS.iOS;
        } else {
            return OS.Unknown;
        }
    }
}
