import { Box, Heading } from "@chakra-ui/react";

export const component = function Profile() {
  return (
    <Box w={"full"} h={"full"} p={"20px"} className="polka_background">
      <Box
        p={"20px"}
        background={"white"}
        borderRadius={"10px"}
        boxShadow={"md"}
      >
        <Heading color={"gray.700"} mb={"50px"}>
          Profile
        </Heading>
      </Box>
    </Box>
  );
};
