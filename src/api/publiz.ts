import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

type Option = {
  token?: string;
};
export type BaseResponse<T> = {
  data: T;
};
export type User = {
  id: number;
  authId: string;
  displayName: string;
  dob?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  gender?: string;
};

function createPublizApi({ token }: Option) {
  const baseUrl = "https://genzdev-staging-publiz-api.fibotree.com";
  return {
    async fetchJson(input: RequestInfo, init?: RequestInit) {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      const response = await fetch(input, {
        ...init,
        headers,
      });
      if (response.status === 204) {
        return "204 No Content";
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      return data;
    },

    async getMyProfile(): Promise<BaseResponse<User>> {
      return this.fetchJson(`${baseUrl}/api/v1/users/my_profile`, {
        method: "GET",
      });
    },
  };
}
export const useApiCall = () => {
  const auth = useAuth();
  return useMemo(() => {
    return createPublizApi({ token: auth.token });
  }, [auth.token]);
};

export const useApiCallImplicitly = (token?: string) => {
  return useMemo(() => {
    return createPublizApi({ token });
  }, [token]);
};
