import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { UserData } from "./types/session";

interface FetchParams {
  username: string;
  password: string;
}

const login = async ({ username, password }: FetchParams) => {
  const result = await axiosMainServer.post(`/auth/login`, {
    username,
    password,
  });

  return result.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData<UserData>([QueryKey.Session], () => data);
    },
  });

  return {
    login: mutate,
    isPending,
  };
};
