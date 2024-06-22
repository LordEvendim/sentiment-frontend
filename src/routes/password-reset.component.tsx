import {
  Box,
  Button,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

import { useSetPassword } from "#hooks/api/useSetPassword";

export const component = function PasswordReset() {
  const search = useSearch({
    from: "/password-reset",
  });
  const { setPassword, isPending } = useSetPassword();
  const navigate = useNavigate();
  const toast = useToast();
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");

  const handleSetPasword = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { token, userId } = search;

    if (!token || !userId) {
      toast({ status: "error", description: "Invalid link" });
      navigate({ to: "/" });
      return;
    }

    if (isPending) return;
    if (passwordInput !== passwordRepeat) return;

    setPassword(
      { token, userId, password: passwordInput },
      {
        onSuccess: () => {
          toast({ status: "success", description: "Password changed" });
          navigate({ to: "/" });
        },
        onError: () => {
          toast({
            status: "error",
            description: "Can't chagne your password",
          });
          navigate({ to: "/" });
        },
      }
    );
  };

  const isDifferent = passwordRepeat !== "" && passwordInput !== passwordRepeat;

  return (
    <Box mt={"200px"} w={"full"}>
      <VStack
        flexDir={"column"}
        w={"500px"}
        background={"white"}
        p={"20px"}
        spacing={"30px"}
        borderRadius={"15px"}
        boxShadow={"md"}
        mx={"auto"}
      >
        <Heading fontWeight={"bold"} fontSize={"2xl"} color={"gray.600"}>
          Reset password
        </Heading>
        <Box w={"full"}>
          <Box
            fontWeight={"bold"}
            ml={"10px"}
            mb={"5px"}
            color={"gray.500"}
            fontSize={"small"}
          >
            NEW PASSWORD
          </Box>
          <Input
            type="password"
            fontSize={"small"}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value ?? "")}
          />
        </Box>
        <Box w={"full"}>
          <Box
            fontWeight={"bold"}
            ml={"10px"}
            mb={"5px"}
            color={"gray.500"}
            fontSize={"small"}
          >
            REPEAT PASSWORD
          </Box>
          <Input
            type="password"
            fontSize={"small"}
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value ?? "")}
          />
        </Box>
        <Box w={"full"}>
          {isDifferent && (
            <Box
              mx={"auto"}
              color={"red.600"}
              mb={"10px"}
              fontSize={"small"}
              ml={"10px"}
            >
              Paswords must match!
            </Box>
          )}
          {passwordInput !== "" && passwordInput.length < 4 && (
            <Box
              mx={"auto"}
              color={"red.600"}
              mb={"10px"}
              fontSize={"small"}
              ml={"10px"}
            >
              Paswords must be at least 4 digits long!
            </Box>
          )}
          {passwordInput.length > 250 && (
            <Box
              mx={"auto"}
              color={"red.600"}
              mb={"10px"}
              ml={"10px"}
              fontSize={"small"}
            >
              Paswords can't be longer then 250 characters!
            </Box>
          )}
          <Button
            onClick={() => handleSetPasword()}
            isLoading={isPending}
            background={"blue.100"}
            boxShadow={"sm"}
            isDisabled={
              isDifferent ||
              isPending ||
              passwordInput === "" ||
              passwordRepeat === "" ||
              passwordInput.length < 4 ||
              passwordInput.length > 255
            }
          >
            Set new password
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
