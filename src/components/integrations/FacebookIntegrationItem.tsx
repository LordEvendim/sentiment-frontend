import { Box, Button, HStack, Spacer, useToast } from "@chakra-ui/react";

import { useSelectPage } from "#hooks/api/useSelectPage";
import { useFacebook } from "#stores/useFacebook";

interface Props {
  pageId: string;
  isSelected: boolean;
  name: string;
  picture?: string;
  hideButton?: boolean;
}

export const FacebookIntegrationItem: React.FC<Props> = ({
  pageId,
  isSelected,
  name,
  hideButton,
}) => {
  const userId = useFacebook((state) => state.userInfo?.id);
  const { selectPage } = useSelectPage(userId);
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
      h={"60px"}
    >
      <Box
        h={"40px"}
        w={"40px"}
        background={"gray.200"}
        borderRadius={"5px"}
      ></Box>
      <Box>{name}</Box>
      <Spacer />
      {!hideButton &&
        (isSelected ? (
          <Button variant={"outline"} borderColor={"gray.300"}>
            Using
          </Button>
        ) : (
          <Button
            background={"blue.200"}
            isDisabled={!userId}
            onClick={() =>
              selectPage(
                {
                  pageId,
                  userId: userId!,
                },
                {
                  onSuccess: () => {
                    toast({
                      status: "success",
                      title: "Page",
                      description: "Page has been changed",
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
