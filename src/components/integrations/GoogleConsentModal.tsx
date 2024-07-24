import {
  Box,
  Button,
  Checkbox,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  handleLogin: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleConsentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  handleLogin,
}) => {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box ml={"10px"}>Google Consent</Box>
          <Box
            w={"full"}
            mx={"auto"}
            borderTop={"1px"}
            borderColor={"gray.200"}
            mt={"20px"}
          ></Box>
        </ModalHeader>
        <ModalCloseButton top={"20px"} right={"20px"} />
        <ModalBody mb={"20px"} mt={"10px"}>
          <Stack pl={6} mt={1} spacing={"20px"}>
            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([e.target.checked, checkedItems[1]])
              }
            >
              By signing up/logging in, I agree to the
              <Link
                href="https://clickclarity.ai/terms-of-service"
                color="teal.400"
                isExternal
                mx={"5px"}
              >
                Terms of Service
              </Link>
              and
              <Link
                href="https://clickclarity.ai/privacy-policy"
                color="teal.400"
                isExternal
                mx={"5px"}
              >
                Privacy Policy.
              </Link>
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              <Box>
                I have read and agree to the
                <Link
                  href="https://clickclarity.ai/terms-of-service"
                  color="teal.400"
                  isExternal
                  mx={"5px"}
                >
                  Terms of Service
                </Link>
                and
                <Link
                  href="https://clickclarity.ai/privacy-policy"
                  color="teal.400"
                  isExternal
                  mx={"5px"}
                >
                  Privacy Policy.
                </Link>
              </Box>
            </Checkbox>
            <Button
              isDisabled={!allChecked}
              onClick={handleLogin}
              background={"cyan.200"}
              boxShadow={"sm"}
              mt={"20px"}
            >
              Continue
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
