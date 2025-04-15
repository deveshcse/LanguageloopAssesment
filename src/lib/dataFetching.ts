// import axiosInstance from "./axios";

// type FetcherParams = {
//   apiPath: string;
//   payload?: {
//     limit?: number;
//     skip?: number;
//     // [key: string]: any;
//   };
// };

// export const fetchData = async <T>(params: FetcherParams): Promise<T> => {
//   const { apiPath, payload } = params;

//   const response = await axiosInstance.get(apiPath, {
//     params: payload,
//   });

//   console.log("response",payload, response.data);

//   return response.data;
// };

import axiosInstance from "./axios";
interface PostQueryParams {
    limit?: number;
    skip?: number;
  }
type FetcherParams = {
  apiPath: string;
  payload?: PostQueryParams;
};

export const fetchData = async <T>({
  apiPath,
  payload = {},
}: FetcherParams): Promise<T> => {
  console.log(payload);
  const params = Object.keys(payload).length > 0 ? payload : undefined;

  const response = await axiosInstance.get<T>(apiPath, { params });

  console.log("-------------------------------------------");
  console.log("📦 Payload:", payload, "📥 Response:", response.data);

  return response.data;
};
