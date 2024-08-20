import { Box, Button, HStack, Spacer, useToast } from "@chakra-ui/react";

import { useSession } from "#hooks/api/auth/useSession";
import { useSelectMetaPage } from "#hooks/api/meta/useSelectMetaPage";

interface Props {
  pageId: number;
  isSelected: boolean;
  name: string;
  isSelectDisabled: boolean;
  picture?: string;
  hideButton?: boolean;
}

export const FacebookPageItem: React.FC<Props> = ({
  pageId,
  isSelected,
  name,
  hideButton,
  isSelectDisabled,
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
          )
        ))}
    </HStack>
  );
};
