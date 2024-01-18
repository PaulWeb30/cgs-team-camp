import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class HttpService {
  private baseUrl: string;

  private fetchingService: AxiosInstance;

  private apiVersion: string;

  constructor(
    baseUrl: string = process.env.SERVER_URL || 'http://localhost:4200',
    fetchingService: AxiosInstance = axios,
    apiVersion: string = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig(): Record<string, string | null> {
    return {
      Authorization: localStorage.getItem('token')
    };
  }

  private extractUrlAndDataFromConfig(config: AxiosRequestConfig): AxiosRequestConfig {
    const { data, url, ...configWithoutDataAndUrl } = config;
    return configWithoutDataAndUrl;
  }

  get(config: AxiosRequestConfig, withAuth: boolean = true): Promise<any> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .get(this.getFullApiUrl(config.url as string), this.extractUrlAndDataFromConfig(config))
      .then((res) => res.data);
  }

  put(config: AxiosRequestConfig, withAuth: boolean = true): Promise<any> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .put(
        this.getFullApiUrl(config.url as string),
        config.data,
        this.extractUrlAndDataFromConfig(config)
      )
      .then((res) => res.data);
  }

  post(config: AxiosRequestConfig, withAuth: boolean = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .post(
        this.getFullApiUrl(config.url as string),
        config.data,
        this.extractUrlAndDataFromConfig(config)
      )
      .then((res) => res.data);
  }

  delete(config: AxiosRequestConfig, withAuth: boolean = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .delete(this.getFullApiUrl(config.url as string), config.data)
      .then((res) => res.data);
  }
}
