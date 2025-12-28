export interface User {
  email: string;
  username: string;
  avatar?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface CheckSessionResponse {
  success: boolean;
}
