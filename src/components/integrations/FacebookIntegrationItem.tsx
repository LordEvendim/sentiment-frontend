import { Box, Button, HStack, Spacer } from "@chakra-ui/react";

interface Props {
  isSelected: boolean;
  name: string;
  picture?: string;
}

export const FacebookIntegrationItem: React.FC<Props> = ({
  isSelected,
  name,
}) => {
  return (
    <HStack
      borderColor={"gray.300"}
      borderWidth={"1px"}
      padding={"10px"}
      borderRadius={"10px"}
      boxShadow={"md"}
      spacing={"15px"}
      w={"full"}
    >
      <Box
        h={"40px"}
        w={"40px"}
        background={"gray.200"}
        borderRadius={"5px"}
      ></Box>
      <Box>{name}</Box>
      <Spacer />
      {isSelected ? (
        <Box fontWeight={"bold"} mr={"10px"}>
          Selected
        </Box>
      ) : (
        <Button background={"blue.200"}>Select</Button>
      )}
    </HStack>
  );
};
