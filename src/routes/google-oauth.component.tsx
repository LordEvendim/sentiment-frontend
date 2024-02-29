import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

import { useSetGoogleAccessToken } from "#hooks/api/useSetGoogleAccessToken";

export const component = function GoogleOAuth() {
  const search = useSearch({
    from: "/google-oauth",
  });
  const { setGoogleAccessToken } = useSetGoogleAccessToken();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const code = search.code;

    if (!code) {
      navigate({ to: "/integrations" });
      return;
    }

    setGoogleAccessToken(
      {
        code: code as string,
      },
      {
        onSuccess: () => {
          toast({
            status: "success",
            title: "Google",
            description: "Sucessfully integrated with Google",
          });
          navigate({
            to: "/integrations",
          });
        },
        onError: () => {
          toast({
            status: "error",
            title: "Google",
            description: "Failed to integrate with Google",
          });
          navigate({
            to: "/integrations",
          });
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box mt={"200px"} w={"full"}>
      <Center>
        <Spinner size={"md"} />
      </Center>
    </Box>
  );
};
