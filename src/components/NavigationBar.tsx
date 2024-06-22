import {
  Box,
  Button,
  Flex,
  HStack,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Link, useRouter } from "@tanstack/react-router";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout, MdOutlineSupportAgent } from "react-icons/md";

import { useLogout } from "#hooks/api/useLogout";
import { useSession } from "#hooks/api/useSession";

export const NavigationBar = () => {
  const { userData } = useSession();
  const { isPending, logout } = useLogout();
  const toast = useToast({ position: "top-left" });
  const router = useRouter();

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
          <Link to="/dashboard">Click Clarity</Link>
        </Box>
        {userData ? (
          <HStack spacing={"25px"}>
            <Link to="/integrations" className="[&.active]:font-bold">
              <Button variant={"ghost"} fontSize={"14px"} fontWeight={"normal"}>
                Integrations
              </Button>
            </Link>
            <Popover isLazy>
              <PopoverTrigger>
                <Button
                  variant={"outline"}
                  alignItems={"center"}
                  minWidth={"10px"}
                >
                  <HStack spacing={"20px"}>
                    <Box fontWeight={"normal"}>{userData.fullName}</Box>
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
                      onClick={() => router.navigate({ to: "/settings" })}
                    >
                      <CiSettings size={"20px"} />
                      <Box ml={"20px"} marginBottom={"2px"}>
                        Settings
                      </Box>
                    </Button>
                    <ChakraLink
                      href="https://discord.gg/2D4wYgeq"
                      w={"full"}
                      isExternal
                    >
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
                    </ChakraLink>
                    <Button
                      variant={"ghost"}
                      w={"full"}
                      justifyContent={"start"}
                      fontWeight={"normal"}
                      color={"red.500"}
                      onClick={() =>
                        logout(undefined, {
                          onSuccess: () => {
                            toast({
                              status: "success",
                              title: "Logged out",
                              description: "Successfully logged out",
                            });
                          },
                        })
                      }
                      isLoading={isPending}
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
