import {
  Box,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { CiSettings } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
import { MdOutlineLogout, MdOutlineSupportAgent } from "react-icons/md";

import { useSession } from "#hooks/api/useSession";

export const NavigationBar = () => {
  const { userData } = useSession();

  return (
    <Box
      w="full"
      background={"white"}
      position={"relative"}
      h={"60px"}
      boxShadow={"md"}
      borderBottom={"2px"}
      borderColor={"gray.100"}
      flexShrink={0}
    >
      <Flex
        w={"95%"}
        mx={"auto"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={"full"}
      >
        <Box fontWeight={"extrabold"} color={"gray.700"} fontSize={"large"}>
          <Link to="/">Fusion Media</Link>
        </Box>
        {userData ? (
          <HStack spacing={"25px"}>
            <Button variant={"ghost"} fontSize={"14px"} fontWeight={"normal"}>
              <Link to="/integrations" className="[&.active]:font-bold">
                Integrations
              </Link>
            </Button>
            <Popover isLazy>
              <PopoverTrigger>
                <Button
                  variant={"outline"}
                  alignItems={"center"}
                  minWidth={"10px"}
                >
                  <HStack spacing={"20px"}>
                    <Box>{userData.fullName}</Box>
                    <Box
                      w={"25px"}
                      h={"25px"}
                      borderRadius={"full"}
                      background={"gray.100"}
                    ></Box>
                  </HStack>
                </Button>
              </PopoverTrigger>
              <PopoverContent mr={"10px"} boxShadow={"lg"} w={"250px"}>
                <PopoverArrow />
                <PopoverBody>
                  <VStack alignItems={"start"}>
                    <Button
                      variant={"ghost"}
                      w={"full"}
                      justifyContent={"start"}
                      fontWeight={"normal"}
                    >
                      <LuUser size={"20px"} />
                      <Box ml={"20px"} marginBottom={"2px"}>
                        <Link to="/profile">Profile</Link>
                      </Box>
                    </Button>
                    <Button
                      variant={"ghost"}
                      w={"full"}
                      justifyContent={"start"}
                      fontWeight={"normal"}
                    >
                      <CiSettings size={"20px"} />
                      <Box ml={"20px"} marginBottom={"2px"}>
                        Settings
                      </Box>
                    </Button>
                    <Button
                      variant={"ghost"}
                      w={"full"}
                      justifyContent={"start"}
                      fontWeight={"normal"}
                    >
                      <MdOutlineSupportAgent size={"20px"} />
                      <Box ml={"20px"} marginBottom={"2px"}>
                        Support
                      </Box>
                    </Button>
                    <Button
                      variant={"ghost"}
                      w={"full"}
                      justifyContent={"start"}
                      fontWeight={"normal"}
                      color={"red.500"}
                    >
                      <MdOutlineLogout size={"20px"} />
                      <Box ml={"20px"} marginBottom={"2px"}>
                        Logout
                      </Box>
                    </Button>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        ) : (
          <Box />
        )}
      </Flex>
    </Box>
  );
};
