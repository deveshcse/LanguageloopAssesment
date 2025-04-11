// types/post.ts
export interface Post {
    id: number;
    title: string;
    body: string;
  }
  
  export interface PaginatedResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
  }
  