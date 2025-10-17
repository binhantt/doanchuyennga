export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: number;
    username: string;
    role: string;
  };
}
