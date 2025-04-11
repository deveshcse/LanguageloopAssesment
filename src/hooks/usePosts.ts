// hooks/usePosts.ts
import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PostsApiResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export const usePosts = () => {
  return useQuery<PostsApiResponse[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<PostsApiResponse[]>(
        "https://dummyjson.com/posts?limit=250"
      );
      return data;
    },
  });
};