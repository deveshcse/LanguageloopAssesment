import { fetchData } from "@/lib/dataFetching";
import { CustomQueryParams } from "@/types/customQuery";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

//   console.log("useCustomQuery", params);
//   console.log("apiPath", apiPath);
//     console.log("payload", payload);
//     console.log("showToastMsg", showToastMsg);

//   const { limit, skip } = payload as { limit: number; skip: number };

//   const queryFn = async (): Promise<TData> => {
//     if (!payload) {
//       const response = await axios.get(`https://dummyjson.com/${apiPath}`);
//       return response.data;
//     } else {
//       const response = await axios.get(`https://dummyjson.com/${apiPath}?limit=${limit}&skip=${skip}`);
//       return response.data;
//     }
//   };

const queryFn = () => fetchData<TData>({ apiPath, payload });




  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...reactQueryOptions,
  });
}
