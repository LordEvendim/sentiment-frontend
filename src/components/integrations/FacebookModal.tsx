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

import { MetaAdAccount } from "#hooks/api/types/accounts";
import { useGetUserMetaAccounts } from "#hooks/api/useGetUserAccounts";

import { FacebookAdAccountItem } from "./FacebookAdAccountItem";
import { FacebookPageItem } from "./FacebookPageItem";

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
  const groupedAdAccounts = useMemo(() => {
    const parentAccounts = new Map<string, MetaAdAccount[]>();

    if (!accounts || !accounts.adAccounts) return [];

    for (let i = 0; i < accounts.adAccounts.length; i++) {
      const parentAccountName = accounts.adAccounts[i].parentAccountName;

      parentAccounts.set(parentAccountName, [
        ...(parentAccounts.get(parentAccountName) ?? []),
        accounts.adAccounts[i],
      ]);
    }

    const result: {
      groupAccountName: string;
      accounts: MetaAdAccount[];
    }[] = [];
    for (const [key, value] of parentAccounts.entries()) {
      result.push({
        groupAccountName: key,
        accounts: value,
      });
    }

    return result;
  }, [accounts]);

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
                <Heading mb={"30px"} fontSize={"2xl"} color={"gray.700"}>
                  Pages
                </Heading>
                {accounts?.pages?.map((page) => (
                  <FacebookPageItem
                    key={page.id}
                    isSelected={page.id === selectedPage?.id}
                    name={page.name}
                    pageId={page.id}
                    isSelectDisabled={!accounts?.selectedPage}
                  />
                ))}
              </VStack>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"5px"} fontSize={"2xl"} color={"gray.700"}>
                  Ad Accounts
                </Heading>
                {groupedAdAccounts.map((group) => (
                  <Box w={"full"} mb={"10px"}>
                    <Box
                      fontSize={"small"}
                      color={"gray.500"}
                      ml={"15px"}
                      mb={"5px"}
                    >
                      {group.groupAccountName}
                    </Box>
                    <VStack
                      borderColor={"gray.300"}
                      borderWidth={"1px"}
                      borderRadius={"10px"}
                      boxShadow={"md"}
                      spacing={"5px"}
                      w={"full"}
                    >
                      {group.accounts.map((account) => (
                        <>
                          <FacebookAdAccountItem
                            key={account.id}
                            isSelected={account.id === selectedAdAccount?.id}
                            adAccountId={account.id}
                            isSelectDisabled={!accounts?.selectedAdAccount}
                            inGroup
                          />
                        </>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </SimpleGrid>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
