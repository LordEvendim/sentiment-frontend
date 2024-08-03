import { useMutation } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";

interface RequestData {
  email: string;
}

const resetPassword = async ({ email }: RequestData) => {
  const result = await axiosMainServer.post("/user/reset-password", {
    email,
  });

  return result.data;
};

export const useResetPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
  });

  return {
    resetPassword: mutate,
    isPending,
  };
};
