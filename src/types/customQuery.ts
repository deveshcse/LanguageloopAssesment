import { UseQueryOptions, QueryKey } from '@tanstack/react-query';


export interface CustomQueryParams<TData, TError, TQueryFnData = TData> extends UseQueryOptions<TData, TError, TQueryFnData, QueryKey> {
  apiPath: string;
  payload?: Record<string, string|number>;
  showToastMsg: string;
}
