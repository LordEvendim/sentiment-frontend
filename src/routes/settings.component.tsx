import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

import { useResetPassword } from "#hooks/api/auth/useResetPassword";
import { useSession } from "#hooks/api/auth/useSession";

export const component = function Profile() {
  const { isFetching, userData } = useSession();
  const { isPending, resetPassword } = useResetPassword();
  const toast = useToast();

  const handlePasswordReset = async () => {
    if (!userData?.email) return;

    resetPassword(
      { email: userData.email },
      {
        onSuccess: () =>
          toast({ status: "success", description: "Email has been sent" }),
        onError: () =>
          toast({ status: "error", description: "Can't reset the password" }),
      }
    );
  };

  return (
    <Box w={"full"} h={"full"} p={"20px"} className="polka_background">
      <Flex mb={"10px"}>
        <Text
          color={"gray.600"}
          fontWeight={800}
          fontSize={"x-large"}
          marginLeft={"20px"}
        >
          Settings
        </Text>
        <Spacer />
        <Box></Box>
      </Flex>
      <Box w={"full"}>
        <Box
          mt={"60px"}
          p={"20px"}
          background={"white"}
          borderRadius={"10px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
          display={"flex"}
          alignSelf={"stretch"}
          flexDir={"column"}
          w={"700px"}
          mx={"auto"}
        >
          {isFetching || !userData ? (
            <Spinner />
          ) : (
            <>
              <HStack alignItems={"start"}>
                <Box
                  mt={"-60px"}
                  h={"150px"}
                  w={"150px"}
                  borderRadius={"full"}
                  background={"gray.100"}
                  borderWidth={"1px"}
                  borderColor={"gray.300"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={"gray.300"}
                  overflow={"hidden"}
                >
                  <Box mt={"50px"}>
                    <FaUser size={"100px"} />
                  </Box>
                </Box>
                <Box>
                  <Box
                    fontSize={"2xl"}
                    fontWeight={"extrabold"}
                    ml={"10px"}
                    color={"gray.700"}
                  >
                    {userData.fullName}
                  </Box>
                  <Box
                    fontSize={"md"}
                    fontWeight={"bold"}
                    ml={"10px"}
                    color={"gray.400"}
                  >
                    {userData.username}
                  </Box>
                </Box>
              </HStack>
              {/* <Divider mt={"20px"} mb={"20px"} w={"90%"} mx={"auto"} />
              <Box>
                <Box
                  fontWeight={"bold"}
                  fontSize={"xs"}
                  color={"gray.400"}
                  ml={"10px"}
                  mb={"5px"}
                >
                  USERNAME
                </Box>
                <Input value={userData.username} />
              </Box>
              <Divider mt={"20px"} mb={"20px"} w={"90%"} mx={"auto"} />
              <Button
                background={"blue.100"}
                w={"120px"}
                fontSize={"smaller"}
                boxShadow={"sm"}
              >
                Save changes
              </Button> */}
            </>
          )}
        </Box>
        <Box
          fontSize={"lg"}
          color={"gray.600"}
          fontWeight={"extrabold"}
          mt={"40px"}
          mx={"auto"}
          w={"700px"}
          pl={"20px"}
        >
          Password
        </Box>
        <Box
          mt={"10px"}
          p={"20px"}
          background={"white"}
          borderRadius={"10px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
          display={"flex"}
          alignSelf={"stretch"}
          flexDir={"column"}
          w={"700px"}
          mx={"auto"}
        >
          <Button
            background={"blue.100"}
            boxShadow={"sm"}
            fontSize={"small"}
            w={"200px"}
            isLoading={isPending}
            onClick={() => handlePasswordReset()}
          >
            Reset password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
