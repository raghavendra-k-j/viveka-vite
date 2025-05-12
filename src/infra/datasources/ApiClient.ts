import type { AxiosInstance } from "axios";
import axios from "axios";

export interface ApiClientProps {
  baseURL: string;
}

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor(config: ApiClientProps) {
    this.axiosInstance = ApiClient.createApiClient(config);
  }


  public static createInstace(config: ApiClientProps) {
    ApiClient.instance = new ApiClient(config);
  }


  static findInstance(): ApiClient {
    if (!ApiClient.instance) {
      throw new Error("ApiClient instance not initialized. Call getInstance() first.");
    }
    return ApiClient.instance;
  }

  private static createApiClient(config: ApiClientProps): AxiosInstance {
    const instance = axios.create({
      baseURL: config.baseURL,
      timeout: 5 * 60 * 1000,
    });
    return instance;
  }

  public get axios(): AxiosInstance {
    return this.axiosInstance;
  }


}
