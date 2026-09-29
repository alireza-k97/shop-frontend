export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  token: string;
  authorized: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SessionResponse {
  success: boolean;
  authorized: boolean;
  session: {
    id: string;
  };
}

export interface SignOutResponse {
  success: boolean;
  message: string;
}
