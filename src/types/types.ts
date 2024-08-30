// Define the interface for the request body
export interface CreatePostRequest {
  post_id?: number;
  post_user_id: number;
  post_content: string;
  post_date: string;
  post_tag?: string;
}

// Define the interface for the response
export interface CreatePostResponse {
  post_id: number;
  post_user_id: number;
  post_content: string;
  post_date: string;
  post_tag?: string;
}

// Define the interface for the request body
export interface CreateUserRequest {
  user_id?: number;
  user_name: string;
  email: string;
}

// Define the interface for the response
export interface CreateUserResponse {
  user_id: number | string;
  user_name: string;
  email: string;
}