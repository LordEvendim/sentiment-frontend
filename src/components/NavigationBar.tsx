import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

import { useFacebook } from "#stores/useFacebook";

export const NavigationBar = () => {
  const userInfo = useFacebook((state) => state.userInfo);

  return (
    <Box
      w="full"
      background={"white"}
      position={"relative"}
      h={"60px"}
      boxShadow={"md"}
      borderBottom={"2px"}
      borderColor={"gray.100"}
    >
      <Flex
        w={"95%"}
        mx={"auto"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={"full"}
      >
        <Box fontWeight={"extrabold"} color={"gray.700"} fontSize={"large"}>
          Fusion Media
        </Box>
        <HStack spacing={"25px"}>
          <Button variant={"ghost"} fontSize={"14px"} fontWeight={"normal"}>
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
          </Button>
          <Button variant={"ghost"} fontSize={"14px"} fontWeight={"normal"}>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </Button>
          <Button variant={"ghost"} fontSize={"14px"} fontWeight={"normal"}>
            <Link to="/integrations" className="[&.active]:font-bold">
              Integrations
            </Link>
          </Button>
          <Button variant={"outline"} alignItems={"center"} minWidth={"10px"}>
            <HStack spacing={"20px"}>
              {userInfo?.fullName && <Box>{userInfo?.fullName}</Box>}
              <Box
                w={"25px"}
                h={"25px"}
                borderRadius={"full"}
                background={"gray.100"}
              ></Box>
            </HStack>
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
