import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMemo } from "react";

import { Facebook } from "#components/Facebook";
import { FacebookIntegrationItem } from "#components/integrations/FacebookIntegrationItem";
import { FacebookModal } from "#components/integrations/FacebookModal";
import { useGetLongLivedToken } from "#hooks/api/useGetLongLivedToken";
import { useGetUserAccounts } from "#hooks/api/useGetUserAccounts";
import { useSession } from "#hooks/api/useSession";
import { useFacebook } from "#stores/useFacebook";

export const component = function Integrations() {
  const userInfo = useFacebook((state) => state.userInfo);
  const login = useFacebook((state) => state.login);
  const logout = useFacebook((state) => state.logout);
  const {
    isOpen: isFacebookModalOpen,
    onOpen: onFacebookModalOpen,
    onClose: onFacebookModalClose,
  } = useDisclosure();
  const toast = useToast();

  const { userData } = useSession();
  const { isFetching } = useGetLongLivedToken(
    userData?.id,
    userInfo?.id,
    userInfo?.slAccessToken
  );

  const { accounts, isFetching: isLoadingUserAccounts } = useGetUserAccounts(
    userData?.id,
    true
  );

  const selectedPage = useMemo(
    () => accounts?.pages?.find((page) => page.id === accounts?.selectedPage),
    [accounts]
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
              toast({
                status: "success",
                title: "Meta",
                description: "You have been successfully logged in",
              });
            });
          } else {
            toast({
              status: "warning",
              title: "Meta",
              description: "Login has been cancelled or not fully authorized",
            });
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
    window.FB.logout(() => {
      logout();
      toast({
        status: "info",
        title: "Meta",
        description: "You have been logged out",
      });
    });
  };

  return (
    <Box w={"full"} h={"full"} p={"15px"}>
      <FacebookModal
        isOpen={isFacebookModalOpen}
        onClose={onFacebookModalClose}
      />
      <Box
        p={"15px"}
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
          p={"15px"}
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
          <SimpleGrid columns={2} spacing={"10px"} minHeight={"200px"}>
            {isLoadingUserAccounts ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              selectedPage && (
                <FacebookIntegrationItem
                  hideButton
                  pageId={selectedPage.id}
                  name={selectedPage.name}
                  isSelected={true}
                />
              )
            )}
          </SimpleGrid>
        </Box>
        <Box
          justifyContent={"space-between"}
          alignItems={"center"}
          p={"15px"}
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
