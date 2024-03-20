import { Box, Button, HStack, Spacer, useToast } from "@chakra-ui/react";

import { useSelectMetaPage } from "#hooks/api/useSelectMetaPage";
import { useSession } from "#hooks/api/useSession";

interface Props {
  pageId: number;
  isSelected: boolean;
  name: string;
  picture?: string;
  hideButton?: boolean;
}

export const FacebookPageItem: React.FC<Props> = ({
  pageId,
  isSelected,
  name,
  hideButton,
}) => {
  const { userData } = useSession();
  const { selectPage } = useSelectMetaPage();
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
                      description: "Page has been changed",
                    });
                  },
                  onError: (error) => {
                    console.error(error);
                    toast({
                      status: "error",
                      title: "Page",
                      description: "Failed to change the page",
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
