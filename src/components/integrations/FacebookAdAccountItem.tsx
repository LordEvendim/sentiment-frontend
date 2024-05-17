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
  hideButton?: boolean;
  inGroup?: boolean;
  parentAccountName?: string;
}

export const FacebookAdAccountItem: React.FC<Props> = ({
  adAccountId,
  isSelected,
  hideButton,
  inGroup,
  parentAccountName,
}) => {
  const { userData } = useSession();
  const { selectAdAccount } = useSelectMetaAdAccount();
  const toast = useToast({ position: "top" });

  return (
    <HStack
      padding={"10px"}
      borderRadius={"10px"}
      w={"full"}
      h={"70px"}
      _hover={
        inGroup
          ? {
              background: "gray.50",
              transitionDuration: "200ms",
              transitionTimingFunction: "ease-in-out",
            }
          : {}
      }
      boxShadow={inGroup ? "none" : "md"}
      borderColor={inGroup ? "none" : "gray.300"}
      borderWidth={inGroup ? "0px" : "1px"}
      spacing={"15px"}
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
          <Button
            variant={"outline"}
            borderColor={"gray.300"}
            cursor={"default"}
          >
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
                    console.error(error);
                    toast({
                      status: "error",
                      title: "Page",
                      description: "Failed to change Ad Account",
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
