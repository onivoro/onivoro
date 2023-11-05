
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

const globalConfig: RetryConfig = {
  retry: 3,
  retryDelay: 1000,
};


export function axiosInstanceFactory(
  headerSetterMap: Record<string, (req: AxiosRequestConfig<any>) => string> = {},
  errorHandlerMap: Record<number, (err: any, res?: AxiosResponse<any, any>) => void> = {}
) {

  const instance = axios.create(globalConfig);

  instance.interceptors.request.use(req => {

    if (!req.headers) {
      req.headers = {} as any;
    }

    Object.entries(headerSetterMap || {}).forEach(([header, resolver]) => {
      (req.headers as any)[header] = resolver(req);
    });

    return req;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      console.warn({ err, msg: 'axiosInstanceFactory error' });

      const errorHandler = (errorHandlerMap || {})[err?.response?.status];
      if(errorHandler) {
        return errorHandler(err, err?.response);
      }

      return err;
    }
  );

  return instance;
}
