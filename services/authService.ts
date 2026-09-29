import { API_URL } from "@/lib/api";

import type {
  SignUpData,
  SignUpResponse,
  SignInData,
  SignInResponse,
  SessionResponse,
  SignOutResponse,
} from "@/types/auth";

export async function signUp(data: SignUpData): Promise<SignUpResponse> {
  const response = await fetch(`${API_URL}/api/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: SignUpResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function signIn(data: SignInData): Promise<SignInResponse> {
  const response = await fetch(`${API_URL}/api/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: SignInResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function getSession(cookie?: string): Promise<SessionResponse> {
  const response = await fetch(`${API_URL}/api/auth/session`, {
    method: "GET",
    headers: cookie
      ? {
          Cookie: cookie,
        }
      : undefined,
    cache: "no-store",
  });

  const result: SessionResponse = await response.json();

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return result;
}

export async function signOut(): Promise<SignOutResponse> {
  const response = await fetch(`${API_URL}/api/auth/sign-out`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
  
  return result;
}
