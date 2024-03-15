import {
  Box,
  Button,
  HStack,
  Spacer,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useSelectMetaAdAccount } from "#hooks/api/useSelectMetaAdAccount";
import { useSession } from "#hooks/api/useSession";

interface Props {
  adAccountId: number;
  isSelected: boolean;
  parentAccountName: string;
  hideButton?: boolean;
}

export const FacebookAdAccountItem: React.FC<Props> = ({
  adAccountId,
  isSelected,
  hideButton,
  parentAccountName,
}) => {
  const { userData } = useSession();
  const { selectAdAccount } = useSelectMetaAdAccount();
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
        <Box>{adAccountId}</Box>
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
              selectAdAccount(
                {
                  adAccountId,
                },
                {
                  onSuccess: () => {
                    toast({
                      status: "success",
                      title: "Page",
                      description: "Ad Account has been changed",
                    });
                  },
                  onError: (error) => {
                    toast({
                      status: "error",
                      title: "Page",
                      description: error.message,
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
