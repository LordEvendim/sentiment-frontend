import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { TbPlugConnectedX } from "react-icons/tb";

import GoogleLogo from "#assets/integrations/google.png";
import MetaLogo from "#assets/integrations/meta.png";
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
        authResponse: {
          accessToken: string;
          data_access_expiration_time: number;
          expiresIn: number;
          userID: string;
        };
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
            metaId: response.authResponse.userID,
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

  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Facebook />
      <FacebookModal
        isOpen={isFacebookModalOpen}
        onClose={onFacebookModalClose}
      />
      <GoogleModal isOpen={isGoogleModalOpen} onClose={onGoogleModalClose} />
      <Text
        color={"gray.700"}
        mb={"20px"}
        ml={"20px"}
        fontWeight={800}
        fontSize={"xx-large"}
      >
        Integrations
      </Text>
      <SimpleGrid columns={2} spacing={"10px"}>
        <Box
          justifyContent={"space-between"}
          alignItems={"center"}
          p={"15px"}
          background={"white"}
          borderRadius={"10px"}
          boxShadow={"md"}
        >
          <HStack w={"full"} alignItems={"center"} mb={"20px"}>
            <HStack color={"gray.700"} spacing={"20px"}>
              <Image src={MetaLogo} w={"40px"} h={"40px"} />
              <Box fontSize={"2xl"} fontWeight={700}>
                Facebook
              </Box>
              {metaIntegration ? (
                <PiPlugsConnectedBold size={"20px"} />
              ) : (
                <TbPlugConnectedX size={"20px"} />
              )}
            </HStack>
            <Spacer />
            <HStack spacing={"10px"}>
              <Button
                onClick={() => handleFacebookLogin()}
                isLoading={isFetchingMetaIntegration}
              >
                {metaIntegration ? "Reconnect" : "Login"}
              </Button>
              <Button onClick={onFacebookModalOpen} background={"blue.200"}>
                Configure
              </Button>
            </HStack>
          </HStack>
          <SimpleGrid columns={2} spacing={"10px"} minHeight={"200px"}>
            <Box>
              <Box
                mb={"10px"}
                ml={"10px"}
                fontWeight={500}
                color={"gray.700"}
                fontSize={"small"}
              >
                Facebook Pages
              </Box>
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
            </Box>
            <Box>
              <Box
                mb={"10px"}
                ml={"10px"}
                fontWeight={500}
                color={"gray.700"}
                fontSize={"small"}
              >
                Meta Ads
              </Box>
            </Box>
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
          <HStack w={"full"} alignItems={"center"} mb={"20px"}>
            <HStack color={"gray.700"} spacing={"20px"}>
              <Image src={GoogleLogo} w={"40px"} h={"40px"} />
              <Box fontSize={"2xl"} fontWeight={700}>
                Google
              </Box>
              {googleIntegration ? (
                <PiPlugsConnectedBold size={"20px"} />
              ) : (
                <TbPlugConnectedX size={"20px"} />
              )}
            </HStack>
            <Spacer />
            <HStack spacing={"10px"}>
              <Button
                onClick={() => handleGoogleLogin()}
                isLoading={isFetchingGoogleIntegration}
              >
                {googleIntegration ? "Reconnect" : "Login"}
              </Button>
              <Button onClick={onGoogleModalOpen} background={"blue.200"}>
                Configure
              </Button>
            </HStack>
          </HStack>
          <SimpleGrid columns={2} spacing={"10px"} minHeight={"200px"}>
            <Box>
              <Box
                mb={"10px"}
                ml={"10px"}
                fontWeight={500}
                color={"gray.700"}
                fontSize={"small"}
              >
                Google Analytics
              </Box>
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
            </Box>
            <Box>
              <Box
                mb={"10px"}
                ml={"10px"}
                fontWeight={500}
                color={"gray.700"}
                fontSize={"small"}
              >
                Google Ads
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
