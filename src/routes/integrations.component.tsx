import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { Facebook } from "#components/Facebook";
import { FacebookIntegrationItem } from "#components/integrations/FacebookIntegrationItem";
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
      <Modal
        isOpen={isFacebookModalOpen}
        onClose={onFacebookModalClose}
        size={"4xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box>Meta Intergations</Box>
            <Box
              w={"full"}
              mx={"auto"}
              borderTop={"1px"}
              borderColor={"gray.200"}
              mt={"20px"}
            ></Box>
          </ModalHeader>
          <ModalCloseButton top={"20px"} right={"20px"} />
          <ModalBody mb={"20px"}>
            <SimpleGrid columns={2} spacing={10}>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"20px"} fontSize={"2xl"} color={"gray.700"}>
                  Pages
                </Heading>
                <FacebookIntegrationItem
                  isSelected={true}
                  name="Facebook page"
                />
                <Divider borderColor={"transparent"} />
                <FacebookIntegrationItem
                  isSelected={false}
                  name="Facebook page 2"
                />
                <FacebookIntegrationItem
                  isSelected={false}
                  name="Facebook page 3"
                />
                <FacebookIntegrationItem
                  isSelected={false}
                  name="Facebook page 4"
                />
              </VStack>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"20px"} fontSize={"2xl"} color={"gray.700"}>
                  Ad Accounts
                </Heading>
                <FacebookIntegrationItem isSelected={true} name="Ad Account" />
                <Divider borderColor={"transparent"} />
                <FacebookIntegrationItem
                  isSelected={false}
                  name="Ad Account 2"
                />
                <FacebookIntegrationItem
                  isSelected={false}
                  name="Ad Account 3"
                />
                <FacebookIntegrationItem
                  isSelected={false}
                  name="Ad Account 4"
                />
              </VStack>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
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
