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

import { useGetUserAccounts } from "#hooks/api/useGetUserAccounts";
import { useFacebook } from "#stores/useFacebook";

import { FacebookIntegrationItem } from "./FacebookIntegrationItem";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FacebookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const userId = useFacebook((state) => state.userInfo?.id);
  const { accounts, isFetching } = useGetUserAccounts(userId, isOpen);

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
                {accounts?.map((page) => (
                  <FacebookIntegrationItem
                    isSelected={false}
                    key={page.id}
                    name={page.name}
                  />
                ))}
              </VStack>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"20px"} fontSize={"2xl"} color={"gray.700"}>
                  Ad Accounts
                </Heading>
              </VStack>
            </SimpleGrid>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
