import { Box, Button, Heading, HStack } from "@chakra-ui/react";

import { Facebook } from "#components/Facebook";
import { useFacebook } from "#stores/useFacebook";

export const component = function Integrations() {
  const userInfo = useFacebook((state) => state.userInfo);
  const login = useFacebook((state) => state.login);

  const handleFacebookLogin = () => {
    window.FB.login(
      (response: {
        status: "connected" | "unknown";
        authResponse: unknown;
      }) => {
        if (response.status === "connected") {
          if (response.authResponse) {
            window.FB.api(
              "/me",
              { fields: "name, email" },
              (response: { name: string }) => {
                console.log("me");
                console.log(response);
                login(response.name);
              }
            );
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        }
      },
      {
        scope: "email,public_profile,read_insights",
      }
    );
  };

  const handleFacebookLogout = () => {
    window.FB.logout((response: unknown) => {
      console.log(response);
    });
  };

  return (
    <Box w={"full"} h={"full"} p={"20px"}>
      <Box
        p={"20px"}
        background={"white"}
        borderRadius={"10px"}
        boxShadow={"md"}
      >
        <Facebook />
        <Heading color={"gray.700"} mb={"50px"}>
          Integrations
        </Heading>
        <Heading fontSize={"2xl"} color={"gray.700"} mb={"20px"}>
          Facebook {userInfo && "(connected)"}
        </Heading>
        <HStack spacing={"10px"}>
          <Button onClick={() => handleFacebookLogin()}>Login</Button>
          <Button onClick={() => handleFacebookLogout()}>Logout</Button>
        </HStack>
      </Box>
    </Box>
  );
};
