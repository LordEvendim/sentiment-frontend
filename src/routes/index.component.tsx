import {
  Box,
  Button,
  Center,
  Input,
  Link,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { WaitlistModal } from "#components/WaitlistModal";
import { useLogin } from "#hooks/api/useLogin";
import { useSession } from "#hooks/api/useSession";

interface FormInput {
  username: string;
  password: string;
}

export const component = function Index() {
  const {
    isOpen: isWaitlistOpen,
    onOpen: onWaitlistOpen,
    onClose: onWaitlistClose,
  } = useDisclosure();
  const { isPending, login } = useLogin();
  const { isFetching } = useSession();
  const toast = useToast();
  const { formState } = useForm();

  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data, e) => {
    e?.preventDefault();

    login(
      {
        password: data.password,
        username: data.username,
      },
      {
        onError: (error) => {
          toast({
            status: "error",
            title: "Failed to login",
            description: error.message,
          });
        },
      }
    );
  };

  const onErrors: SubmitErrorHandler<FormInput> = (errors) => {
    console.log(errors);

    toast({
      status: "error",
      title: "Failed to login",
      description: errors.root?.message,
    });
  };

  return (
    <>
      <Box
        className="login_background"
        w={"full"}
        h={"full"}
        position={"absolute"}
      />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={onWaitlistClose} />
      <Box
        w={"500px"}
        position={"absolute"}
        top={"40%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        background={"white"}
        borderRadius={"20px"}
        p={"20px"}
        pb={"40px"}
        borderColor={"gray.300"}
        borderWidth={"1px"}
        boxShadow={"xl"}
      >
        <Center fontWeight={"bold"} fontSize={"3xl"} marginBottom={"30px"}>
          Login
        </Center>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <VStack w={"full"} spacing={"20px"}>
            <Box w={"full"}>
              <Box ml={"8px"} mb={"5px"}>
                Username
              </Box>
              <Input
                borderColor={"gray.300"}
                {...register("username", { required: true, min: 1 })}
              />
            </Box>
            <Box w={"full"}>
              <Box ml={"8px"} mb={"5px"}>
                Password
              </Box>
              <Input
                borderColor={"gray.300"}
                type="password"
                {...register("password", { required: true, min: 1 })}
              />
            </Box>
            <Button
              w={"full"}
              background={"blue.400"}
              color={"white"}
              fontWeight={"bold"}
              marginTop={"10px"}
              isLoading={isPending || isFetching}
              type="submit"
              disabled={!formState.isValid}
            >
              Login
            </Button>
          </VStack>
        </form>
        <Box color={"gray.800"} fontSize={"sm"} mt={"10px"} ml={"5px"}>
          Don't have an account?{" "}
          <Link color={"blue.300"} onClick={() => onWaitlistOpen()}>
            Sign up for a waitlist!
          </Link>
        </Box>
      </Box>
    </>
  );
};
