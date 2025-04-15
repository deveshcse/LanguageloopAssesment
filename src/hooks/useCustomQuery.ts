import { fetchData } from "@/lib/dataFetching";
import { CustomQueryParams } from "@/types/customQuery";
import { useQuery } from "@tanstack/react-query";

export function useCustomQuery<TData, TError>(
  params: CustomQueryParams<TData, TError>
) {
  const {
    apiPath,
    payload = {},
    showToastMsg,
    queryKey,
    ...reactQueryOptions
  } = params;

  const queryFn = () => fetchData<TData>({ apiPath, payload });

  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...reactQueryOptions,
  });
}
