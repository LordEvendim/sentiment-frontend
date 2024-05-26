import { Box, Center, Spinner } from "@chakra-ui/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { useCreateGoogleAccessToken } from "#hooks/api/useCreateGoogleAccessToken";

export const component = function GoogleOAuth() {
  const initialized = useRef(false);
  const search = useSearch({
    from: "/google-oauth",
  });
  const { createGoogleAccessToken: setGoogleAccessToken, isPending } =
    useCreateGoogleAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const code = search.code;

    if (!code) {
      navigate({ to: "/integrations" });
      return;
    }

    if (isPending || initialized.current) return;
    if (!initialized.current) initialized.current = true;

    setGoogleAccessToken({
      code: code as string,
    });
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
