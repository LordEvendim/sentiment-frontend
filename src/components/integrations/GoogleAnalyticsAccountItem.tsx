import {
  Box,
  Button,
  HStack,
  Spacer,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useSession } from "#hooks/api/auth/useSession";
import { useSelectGoogleAccount } from "#hooks/api/google/useSelectGoogleAccount";

interface Props {
  pageId: number;
  isSelected: boolean;
  name: string;
  isSelectDisabled: boolean;
  picture?: string;
  hideButton?: boolean;
  inGroup?: boolean;
  parentAccountName?: string;
}

export const GoogleAnalyticsAccountItem: React.FC<Props> = ({
  pageId,
  isSelected,
  name,
  hideButton,
  inGroup,
  parentAccountName,
  isSelectDisabled,
}) => {
  const { userData } = useSession();
  const { selectPage } = useSelectGoogleAccount();
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
        <Box>{name}</Box>
      </VStack>
      <Spacer />
      {!hideButton &&
        (isSelected ? (
          <HStack
            p={"10px"}
            position={"relative"}
            background={"rgba(72, 187, 120, 0.15)"}
            borderRadius={"8px"}
            borderColor={"rgba(72, 187, 120, 0.2)"}
            borderWidth={"1px"}
          >
            <Box
              fontSize={"13px"}
              fontWeight={"bold"}
              color={"gray.600"}
              mr={"6px"}
            >
              USING
            </Box>
            <Box
              h={"12px"}
              w={"12px"}
              background={"green.400"}
              borderRadius={"full"}
              overflow={"visible"}
              position={"relative"}
              mr={"5px"}
            >
              <Box
                top={"50%"}
                left={"50%"}
                transform={"translate(-50%, -50%);"}
                position={"absolute"}
                h={"25px"}
                w={"25px"}
                background={"green.400"}
                borderRadius={"full"}
                opacity={0.2}
              ></Box>
            </Box>
          </HStack>
        ) : (
          isSelectDisabled && (
            <Button
              variant={"ghost"}
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
          )
        ))}
    </HStack>
  );
};
