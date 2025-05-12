import type { AxiosInstance } from "axios";
import axios from "axios";

export interface BaseApiClientProps {
  baseURL: string;
}

export class BaseApiClient {
  private static instance: BaseApiClient;
  private axiosInstance: AxiosInstance;

  private constructor(config: BaseApiClientProps) {
    this.axiosInstance = BaseApiClient.createApiClient(config);
  }


  public static createInstace(config: BaseApiClientProps) {
    BaseApiClient.instance = new BaseApiClient(config);
  }


  static findInstance(): BaseApiClient {
    if (!BaseApiClient.instance) {
      throw new Error("BaseApiClient instance not initialized. Call getInstance() first.");
    }
    return BaseApiClient.instance;
  }

  private static createApiClient(config: BaseApiClientProps): AxiosInstance {
    return axios.create({
      baseURL: config.baseURL,
      timeout: 2 * 60 * 1000,
    });
  }

  public get axios(): AxiosInstance {
    return this.axiosInstance;
  }
}
