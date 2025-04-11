import { PostsApiResponse } from "@/types/postResponseTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async (page?: number, limit?: number): Promise<PostsApiResponse> => {
  let url = "https://dummyjson.com/posts";

  if (page && limit) {
    const skip = (page - 1) * limit;
    url += `?limit=${limit}&skip=${skip}`;
  } else {
    url += `?limit=251`; // Fetch all if no pagination params
  }

  const res = await axios.get(url);
  return res.data;
};

export const usePosts = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => fetchPosts(page, limit),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // optional: avoid refetch for 5 mins
  });
};
