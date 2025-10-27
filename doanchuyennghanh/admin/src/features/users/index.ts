export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  password?: string; // Password might not always be returned or needed for display
  role: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface UserListResponse {
  data: User[];
  total?: number;
}
