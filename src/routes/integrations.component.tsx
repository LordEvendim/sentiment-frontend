import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { RxHamburgerMenu, RxLoop } from "react-icons/rx";
import { TbPlugConnectedX } from "react-icons/tb";

import GoogleLogo from "#assets/integrations/google.png";
import MetaLogo from "#assets/integrations/meta.png";
import { Facebook } from "#components/Facebook";
import { FacebookAdAccountItem } from "#components/integrations/FacebookAdAccountItem";
import { FacebookModal } from "#components/integrations/FacebookModal";
import { FacebookPageItem } from "#components/integrations/FacebookPageItem";
import { GoogleAdAccountItem } from "#components/integrations/GoogleAdAccountItem";
import { GoogleAnalyticsAccountItem } from "#components/integrations/GoogleAnalyticsAccountItem";
import { GoogleConsentModal } from "#components/integrations/GoogleConsentModal";
import { GoogleLoginButton } from "#components/integrations/GoogleLoginButton";
import { GoogleModal } from "#components/integrations/GoogleModal";
import { useGetGoogleAuthUrl } from "#hooks/api/google/useGetGoogleAuthUrl";
import { useGetGoogleIntegration } from "#hooks/api/google/useGetGoogleIntegration";
import { useGoogleLogout } from "#hooks/api/google/useGoogleLogout";
import { useCreateMetaAccessToken } from "#hooks/api/meta/useCreateMetaAccessToken";
import { useGetMetaIntegration } from "#hooks/api/meta/useGetMetaIntegration";
import { useMetaLogout } from "#hooks/api/meta/useMetaLogout";

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
  const {
    isOpen: isGoogleConsentModalOpen,
    onOpen: onGoogleConsentModalOpen,
    onClose: onGoogleCosentModalClose,
  } = useDisclosure();
  const toast = useToast();
  const { url } = useGetGoogleAuthUrl();

  const { googleIntegration, isFetching: isFetchingGoogleIntegration } =
    useGetGoogleIntegration();
  const { metaIntegration, isFetching: isFetchingMetaIntegration } =
    useGetMetaIntegration();
  const { isPending: isPendingGoogleLogout, logout: googleLogout } =
    useGoogleLogout();
  const { isPending: isPendingMetaLogout, logout: metaLogout } =
    useMetaLogout();

  const { createMetaAccessToken } = useCreateMetaAccessToken();

  const handleFacebookLogin = () => {
    window.FB.login(
      (response: {
        status: "connected" | "unknown";
        // @typescript-eslint/no-explicit-any
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

    window.location.href = url;
  };

  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Facebook />
      <FacebookModal
        isOpen={isFacebookModalOpen}
        onClose={onFacebookModalClose}
      />
      <GoogleModal isOpen={isGoogleModalOpen} onClose={onGoogleModalClose} />
      <GoogleConsentModal
        isOpen={isGoogleConsentModalOpen}
        onClose={onGoogleCosentModalClose}
        handleLogin={handleGoogleLogin}
      />
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
              {metaIntegration ? (
                <>
                  <Button
                    onClick={onFacebookModalOpen}
                    rightIcon={<IoMdSettings size={"15px"} />}
                    background={"blue.50"}
                    borderColor={"blue.100"}
                    borderWidth={"1px"}
                  >
                    Configure
                  </Button>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<RxHamburgerMenu />}
                      variant="outline"
                      background={"blue.50"}
                      borderColor={"blue.100"}
                      borderWidth={"1px"}
                    />
                    <MenuList>
                      <MenuItem
                        icon={<RxLoop />}
                        onClick={() => handleFacebookLogin()}
                      >
                        Reconnect
                      </MenuItem>
                      <MenuItem
                        icon={<FiLogOut />}
                        color={"red.600"}
                        onClick={() => metaLogout()}
                      >
                        {isPendingMetaLogout ? <Spinner /> : "Logout"}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => handleFacebookLogin()}
                  isLoading={isFetchingMetaIntegration}
                >
                  {metaIntegration ? "Reconnect" : "Login"}
                </Button>
              )}
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
                  <FacebookPageItem
                    pageId={metaIntegration.selectedPage.pageId}
                    name={metaIntegration.selectedPage.name}
                    isSelected={true}
                    isSelectDisabled={true}
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
              {isFetchingMetaIntegration ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                metaIntegration?.selectedAdAccount && (
                  <FacebookAdAccountItem
                    adAccountId={metaIntegration.selectedAdAccount.id}
                    parentAccountName={
                      metaIntegration.selectedAdAccount.parentAccountName
                    }
                    isSelected={true}
                    isSelectDisabled={true}
                    hideButton
                  />
                )
              )}
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
              {googleIntegration ? (
                <>
                  <Button
                    onClick={onGoogleModalOpen}
                    rightIcon={<IoMdSettings size={"15px"} />}
                    background={"blue.50"}
                    borderColor={"blue.100"}
                    borderWidth={"1px"}
                  >
                    Configure
                  </Button>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<RxHamburgerMenu />}
                      variant="outline"
                      background={"blue.50"}
                      borderColor={"blue.100"}
                      borderWidth={"1px"}
                    />
                    <MenuList>
                      <MenuItem
                        icon={<RxLoop />}
                        onClick={() => handleGoogleLogin()}
                      >
                        Reconnect
                      </MenuItem>
                      <MenuItem
                        icon={<FiLogOut />}
                        color={"red.600"}
                        onClick={() => googleLogout()}
                      >
                        {isPendingGoogleLogout ? <Spinner /> : "Logout"}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <GoogleLoginButton
                  isLoading={isFetchingGoogleIntegration}
                  onClick={onGoogleConsentModalOpen}
                />
              )}
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
                  <GoogleAnalyticsAccountItem
                    pageId={googleIntegration.selectedPage?.id}
                    name={googleIntegration.selectedPage.name}
                    parentAccountName={
                      googleIntegration.selectedPage.parentAccountName
                    }
                    isSelected={true}
                    isSelectDisabled={true}
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
              {isFetchingGoogleIntegration ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                googleIntegration?.selectedAdAccount && (
                  <GoogleAdAccountItem
                    accountId={googleIntegration.selectedAdAccount?.id}
                    isSelected={true}
                    isSelectDisabled={true}
                    hideButton
                  />
                )
              )}
            </Box>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
