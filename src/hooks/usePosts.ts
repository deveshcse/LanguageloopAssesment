import { PostsApiResponse } from "@/types/postResponseTypes";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async (page?: number, limit?: number): Promise<PostsApiResponse> => {
  if (page !== undefined && limit !== undefined) {
    const skip = (page - 1) * limit;
    const res = await axios.get(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
    return res.data;
  } else {
    const res = await axios.get("https://dummyjson.com/posts?limit=251"); 
    return res.data;
  }
};


//keep all props pf react query and extra props
export const usePosts = (page?: number, limit?: number) => {
  const isPaginated = page !== undefined && limit !== undefined;

  return useQuery({
    queryKey: isPaginated ? ["posts", page, limit] : ["posts"],
    queryFn: () => fetchPosts(page, limit),
    placeholderData: keepPreviousData, 
  });
};
