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

import { GoogleAnalyticsAccount } from "#hooks/api/types/accounts";
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
  const groupedAnalyticsAccounts = useMemo(() => {
    const parentAccounts = new Map<string, GoogleAnalyticsAccount[]>();

    if (!accounts || !accounts.analyticsAccounts) return [];

    for (let i = 0; i < accounts.analyticsAccounts.length; i++) {
      const parentAccountName = accounts.analyticsAccounts[i].parentAccountName;

      parentAccounts.set(parentAccountName, [
        ...(parentAccounts.get(parentAccountName) ?? []),
        accounts.analyticsAccounts[i],
      ]);
    }

    const result: {
      groupAccountName: string;
      accounts: GoogleAnalyticsAccount[];
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
                <Heading mb={"5px"} fontSize={"2xl"} color={"gray.700"}>
                  Analytics accounts
                </Heading>
                {groupedAnalyticsAccounts.map((group) => (
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
                          <GoogleAnalyticsAccountItem
                            key={account.id}
                            isSelected={account.id === selectedPage?.id}
                            parentAccountName={account.parentAccountName}
                            name={account.name}
                            pageId={account.id}
                            inGroup
                          />
                        </>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </VStack>
              <VStack spacing={"10px"} alignItems={"start"}>
                <Heading mb={"30px"} fontSize={"2xl"} color={"gray.700"}>
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
