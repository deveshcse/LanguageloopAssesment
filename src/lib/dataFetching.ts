import axiosInstance from "./axios";
interface PostQueryParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: string;
}
type FetcherParams = {
  apiPath: string;
  payload?: PostQueryParams;
};

export const fetchData = async <T>({
  apiPath,
  payload = {},
}: FetcherParams): Promise<T> => {
  const params = Object.keys(payload).length > 0 ? payload : undefined;

  const response = await axiosInstance.get<T>(apiPath, { params });

  return response.data;
};
