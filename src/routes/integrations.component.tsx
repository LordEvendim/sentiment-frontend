import { Box, Button, Heading, HStack } from "@chakra-ui/react";

import { Facebook } from "#components/Facebook";
import { useGetLongLivedToken } from "#hooks/api/useGetLongLivedToken";
import { useFacebook } from "#stores/useFacebook";

export const component = function Integrations() {
  const userInfo = useFacebook((state) => state.userInfo);
  const login = useFacebook((state) => state.login);
  const { isFetching } = useGetLongLivedToken(
    userInfo?.id,
    userInfo?.slAccessToken
  );

  const handleFacebookLogin = () => {
    window.FB.login(
      (response: {
        status: "connected" | "unknown";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        authResponse: any;
      }) => {
        if (response.status === "connected") {
          if (response.authResponse) {
            window.FB.api("/me", {}, (meResponse: { name: string }) => {
              login(
                meResponse.name,
                response.authResponse.userID,
                response.authResponse.accessToken
              );
            });
            window.FB.api("/me/accounts", {}, (response: unknown) => {
              console.log(response);
            });
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        }
      },
      {
        scope:
          "email,public_profile,ads_management,business_management,ads_read,read_insights,instagram_basic,catalog_management,pages_manage_ads,pages_show_list",
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
          <Button onClick={() => handleFacebookLogin()} isLoading={isFetching}>
            Login
          </Button>
          <Button onClick={() => handleFacebookLogout()}>Logout</Button>
        </HStack>
        <Heading fontSize={"2xl"} color={"gray.700"} mb={"20px"} mt={"40px"}>
          Google
        </Heading>
        <HStack spacing={"10px"}>
          <Button onClick={() => handleFacebookLogin()}>Login</Button>
          <Button onClick={() => handleFacebookLogout()}>Logout</Button>
        </HStack>
      </Box>
    </Box>
  );
};
