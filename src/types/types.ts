// Define the interface for the request body
export interface Post {
  post_id?: number;
  post_user_id: number;
  post_content: string;
  post_date: string;
  post_tag?: string;
}

export interface User {
  id?: number;
  user_name: string;
  email: string
  password: string;
  role: userRole;
}

export interface createUserResponse {
  message: string
  user: User;
}

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      role: string;
    }
  }
}

type userRole = "user" | "admin" | "editor"