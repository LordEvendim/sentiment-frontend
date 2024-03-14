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
import { useEffect } from "react";

import { Facebook } from "#components/Facebook";
import { FacebookIntegrationItem } from "#components/integrations/FacebookIntegrationItem";
import { FacebookModal } from "#components/integrations/FacebookModal";
import { GoogleIntegrationItem } from "#components/integrations/GoogleIntegrationItem";
import { GoogleModal } from "#components/integrations/GoogleModal";
import { useCreateMetaAccessToken } from "#hooks/api/useCreateMetaAccessToken";
import { useGetGoogleAuthUrl } from "#hooks/api/useGetGoogleAuthUrl";
import { useGetGoogleIntegration } from "#hooks/api/useGetGoogleIntegration";
import { useGetMetaIntegration } from "#hooks/api/useGetMetaIntegration";

export const component = function Integrations() {
  const {
    isOpen: isFacebookModalOpen,
    onOpen: onFacebookModalOpen,
    onClose: onFacebookModalClose,
  } = useDisclosure();
  const {
    isOpen: isGoogleModalOpen,
    onOpen: onGoogleModalOpen,
    onClose: onGoogleModalClose,
  } = useDisclosure();
  const toast = useToast();
  const { url } = useGetGoogleAuthUrl();

  const { googleIntegration, isFetching: isFetchingGoogleIntegration } =
    useGetGoogleIntegration();
  const { metaIntegration, isFetching: isFetchingMetaIntegration } =
    useGetMetaIntegration();

  const { createMetaAccessToken } = useCreateMetaAccessToken();

  const handleFacebookLogin = () => {
    window.FB.login(
      (response: {
        status: "connected" | "unknown";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        authResponse: any;
      }) => {
        if (response.status !== "connected" || !response.authResponse) {
          toast({
            status: "error",
            title: "Meta",
            description: "Failed to integrate with Meta",
          });
          return;
        }

        createMetaAccessToken(
          {
            accessToken: response.authResponse.accessToken,
            metaId: response.authResponse.userId,
          },
          {
            onSuccess: () => {
              toast({
                status: "success",
                title: "Meta",
                description: "Successfully integrated with Meta",
              });
            },
            onError: () => {
              toast({
                status: "error",
                title: "Meta",
                description: "Failed to integrate with Meta",
              });
            },
          }
        );
      },
      {
        scope:
          "email,public_profile,ads_management,business_management,ads_read,read_insights,catalog_management,pages_manage_ads,pages_show_list",
      }
    );
  };

  const handleGoogleLogin = () => {
    if (!url) return;

    window.location.replace(url);
  };

  useEffect(() => {
    console.log(googleIntegration);
  }, [googleIntegration]);

  return (
    <Box w={"full"} h={"full"} p={"15px"}>
      <Facebook />
      <FacebookModal
        isOpen={isFacebookModalOpen}
        onClose={onFacebookModalClose}
      />
      <GoogleModal isOpen={isGoogleModalOpen} onClose={onGoogleModalClose} />
      <Heading color={"gray.700"} mb={"20px"} ml={"20px"}>
        Integrations
      </Heading>
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
              Facebook {metaIntegration && "(connected)"}
            </Heading>
            <Spacer />
            <HStack spacing={"10px"}>
              <Button
                onClick={() => handleFacebookLogin()}
                isLoading={isFetchingMetaIntegration}
              >
                {metaIntegration ? "Edit permissions" : "Login"}
              </Button>
              <Button onClick={onFacebookModalOpen} background={"blue.200"}>
                Configure
              </Button>
            </HStack>
          </HStack>
          <SimpleGrid columns={2} spacing={"10px"} minHeight={"200px"}>
            {isFetchingMetaIntegration ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              metaIntegration?.selectedPage && (
                <FacebookIntegrationItem
                  pageId={metaIntegration.selectedPage.pageId.toString()}
                  name={metaIntegration.selectedPage.name}
                  isSelected={true}
                  hideButton
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
              Google {googleIntegration && "(connected)"}
            </Heading>
            <Spacer />
            <HStack spacing={"10px"}>
              {!googleIntegration?.accessToken && (
                <Button onClick={() => handleGoogleLogin()}>Login</Button>
              )}
              <Button onClick={onGoogleModalOpen} background={"blue.200"}>
                Configure
              </Button>
            </HStack>
          </HStack>
          <SimpleGrid columns={2} spacing={"10px"} minHeight={"200px"}>
            {isFetchingGoogleIntegration ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              googleIntegration?.selectedPage && (
                <GoogleIntegrationItem
                  pageId={googleIntegration.selectedPage?.id}
                  name={googleIntegration.selectedPage.name}
                  parentAccountName={
                    googleIntegration.selectedPage.parentAccountName
                  }
                  isSelected={true}
                  hideButton
                />
              )
            )}
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
