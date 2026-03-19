export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: { accessToken: string };
}
