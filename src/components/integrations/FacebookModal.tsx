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

import { useGetUserMetaAccounts } from "#hooks/api/useGetUserAccounts";

import { FacebookAdAccountItem } from "./FacebookAdAccountItem";
import { FacebookIntegrationItem } from "./FacebookIntegrationItem";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FacebookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { accounts, isFetching } = useGetUserMetaAccounts(isOpen);

  const selectedPage = useMemo(
    () => accounts?.pages?.find((page) => page.id === accounts?.selectedPage),
    [accounts]
  );
  const selectedAdAccount = useMemo(
    () =>
      accounts?.adAccounts?.find(
        (adAccount) => adAccount.id === accounts?.selectedAdAccount
      ),
    [accounts]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
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
          {isFetching ? (
            <Center>
              <Spinner size={"lg"} />
            </Center>
          ) : (
            <SimpleGrid columns={2} spacing={10}>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"20px"} fontSize={"2xl"} color={"gray.700"}>
                  Pages
                </Heading>
                {accounts?.pages?.map((page) => (
                  <FacebookIntegrationItem
                    key={page.id}
                    isSelected={page.id === selectedPage?.id}
                    name={page.name}
                    pageId={page.id}
                  />
                ))}
              </VStack>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"20px"} fontSize={"2xl"} color={"gray.700"}>
                  Ad Accounts
                </Heading>
                {accounts?.adAccounts?.map((adAccount) => (
                  <FacebookAdAccountItem
                    key={adAccount.id}
                    isSelected={adAccount.id === selectedAdAccount?.id}
                    adAccountId={adAccount.id}
                    parentAccountName={adAccount.parentAccountName}
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
