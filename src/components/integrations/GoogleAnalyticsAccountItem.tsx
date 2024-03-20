import {
  Box,
  Button,
  HStack,
  Spacer,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useSelectGoogleAccount } from "#hooks/api/useSelectGoogleAccount";
import { useSession } from "#hooks/api/useSession";

interface Props {
  pageId: number;
  isSelected: boolean;
  name: string;
  parentAccountName: string;
  picture?: string;
  hideButton?: boolean;
}

export const GoogleAnalyticsAccountItem: React.FC<Props> = ({
  pageId,
  isSelected,
  name,
  parentAccountName,
  hideButton,
}) => {
  const { userData } = useSession();
  const { selectPage } = useSelectGoogleAccount();
  const toast = useToast({ position: "top" });

  return (
    <HStack
      borderColor={"gray.300"}
      borderWidth={"1px"}
      padding={"10px"}
      borderRadius={"10px"}
      boxShadow={"md"}
      spacing={"15px"}
      w={"full"}
      h={"70px"}
    >
      <Box
        h={"50px"}
        w={"50px"}
        background={"gray.200"}
        borderRadius={"5px"}
      ></Box>
      <VStack spacing={"0px"} alignItems={"start"}>
        <Box fontSize={"small"} color={"gray.500"}>
          {parentAccountName}
        </Box>
        <Box>{name}</Box>
      </VStack>
      <Spacer />
      {!hideButton &&
        (isSelected ? (
          <Button variant={"outline"} borderColor={"gray.300"}>
            Using
          </Button>
        ) : (
          <Button
            background={"blue.200"}
            isDisabled={!userData?.id}
            onClick={() =>
              selectPage(
                {
                  pageId,
                },
                {
                  onSuccess: () => {
                    toast({
                      status: "success",
                      title: "Page",
                      description: "Account has been changed",
                    });
                  },
                  onError: (error) => {
                    console.error(error);
                    toast({
                      status: "error",
                      title: "Page",
                      description: "Failed to change the account",
                    });
                  },
                }
              )
            }
          >
            Select
          </Button>
        ))}
    </HStack>
  );
};
