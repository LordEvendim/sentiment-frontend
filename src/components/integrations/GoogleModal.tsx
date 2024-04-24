import {
  Box,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";

import { useGetUserGoogleAccounts } from "#hooks/api/useGetUserGoogleAccounts";

import { GoogleAdAccountItem } from "./GoogleAdAccountItem";
import { GoogleAnalyticsAccountItem } from "./GoogleAnalyticsAccountItem";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { accounts, isFetching } = useGetUserGoogleAccounts(isOpen);

  const selectedPage = useMemo(
    () =>
      accounts?.analyticsAccounts.find(
        (page) => page.id === accounts.selectedAnalyticsAccount
      ),
    [accounts]
  );
  const selectedAdAccount = useMemo(
    () =>
      accounts?.adAccounts.find(
        (page) => page.id === accounts.selectedAdAccount
      ),
    [accounts]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box>Google Intergations</Box>
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
          {isFetching ? (
            <Center>
              <Spinner size={"lg"} />
            </Center>
          ) : (
            <SimpleGrid columns={2} spacing={10}>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"20px"} fontSize={"2xl"} color={"gray.700"}>
                  Analytics accounts
                </Heading>
                {accounts?.analyticsAccounts.map((page) => (
                  <GoogleAnalyticsAccountItem
                    key={page.id}
                    isSelected={page.id === selectedPage?.id}
                    parentAccountName={page.parentAccountName}
                    name={page.name}
                    pageId={page.id}
                  />
                ))}
              </VStack>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"20px"} fontSize={"2xl"} color={"gray.700"}>
                  Ad Accounts
                </Heading>
                {accounts?.adAccounts.map((account) => (
                  <GoogleAdAccountItem
                    key={account.id}
                    isSelected={account.id === selectedAdAccount?.id}
                    accountId={account.id}
                  />
                ))}
              </VStack>
            </SimpleGrid>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
