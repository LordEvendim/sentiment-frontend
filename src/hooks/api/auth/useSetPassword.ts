import { useMutation } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";

interface RequestData {
  token: string;
  userId: number;
  password: string;
}

const setPassword = async ({ token, userId, password }: RequestData) => {
  const result = await axiosMainServer.post("/user/password", {
    token,
    userId,
    password,
  });

  return result.data;
};

export const useSetPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: setPassword,
  });

  return {
    setPassword: mutate,
    isPending,
  };
};
