import {
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

import { Facebook } from "#components/Facebook";
import { FacebookIntegrationItem } from "#components/integrations/FacebookIntegrationItem";
import { FacebookModal } from "#components/integrations/FacebookModal";
import { useGetLongLivedToken } from "#hooks/api/useGetLongLivedToken";
import { useFacebook } from "#stores/useFacebook";

export const component = function Integrations() {
  const userInfo = useFacebook((state) => state.userInfo);
  const login = useFacebook((state) => state.login);
  const { isFetching } = useGetLongLivedToken(
    userInfo?.id,
    userInfo?.slAccessToken
  );
  const {
    isOpen: isFacebookModalOpen,
    onOpen: onFacebookModalOpen,
    onClose: onFacebookModalClose,
  } = useDisclosure();

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
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        }
      },
      {
        scope:
          "email,public_profile,ads_management,business_management,ads_read,read_insights,catalog_management,pages_manage_ads,pages_show_list",
        // instagram_basic
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
      <FacebookModal
        isOpen={isFacebookModalOpen}
        onClose={onFacebookModalClose}
      />
      <Box
        p={"20px"}
        background={"white"}
        borderRadius={"10px"}
        boxShadow={"md"}
        mb={"10px"}
      >
        <Facebook />
        <Heading color={"gray.700"} mb={"50px"}>
          Integrations
        </Heading>
      </Box>
      <SimpleGrid columns={2} spacing={"10px"}>
        <Box
          justifyContent={"space-between"}
          alignItems={"center"}
          p={"20px"}
          background={"white"}
          borderRadius={"10px"}
          boxShadow={"md"}
        >
          <HStack w={"full"} alignItems={"center"} mb={"30px"}>
            <Heading fontSize={"2xl"} color={"gray.700"}>
              Facebook {userInfo && "(connected)"}
            </Heading>
            <Spacer />
            <HStack spacing={"10px"}>
              <Button
                onClick={() => handleFacebookLogin()}
                isLoading={isFetching}
              >
                {userInfo?.id ? "Edit permissions" : "Login"}
              </Button>
              <Button onClick={() => handleFacebookLogout()}>Logout</Button>
              <Button onClick={onFacebookModalOpen} background={"blue.200"}>
                Configure
              </Button>
            </HStack>
          </HStack>
          <SimpleGrid columns={2} spacing={"10px"}>
            <FacebookIntegrationItem name="Page 1" isSelected={true} />
            <FacebookIntegrationItem name="Ad Account 1" isSelected={true} />
          </SimpleGrid>
        </Box>
        <Box
          justifyContent={"space-between"}
          alignItems={"center"}
          p={"20px"}
          background={"white"}
          borderRadius={"10px"}
          boxShadow={"md"}
        >
          <HStack w={"full"} alignItems={"center"} mb={"30px"}>
            <Heading fontSize={"2xl"} color={"gray.700"}>
              Google {userInfo && "(connected)"}
            </Heading>
            <Spacer />
            <HStack spacing={"10px"}>
              <Button isDisabled={true}>Login</Button>
              <Button onClick={() => {}} isDisabled={true}>
                Logout
              </Button>
              <Button
                onClick={() => {}}
                isDisabled={true}
                background={"blue.200"}
              >
                Configure
              </Button>
            </HStack>
          </HStack>
          <SimpleGrid columns={2} spacing={"10px"}></SimpleGrid>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
