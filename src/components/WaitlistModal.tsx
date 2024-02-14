import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export const WaitlistModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Waitlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box ml={"5px"} mb={"5px"}>
            Email
          </Box>
          <Input borderColor={"gray.300"} type="email" />
        </ModalBody>
        <ModalFooter>
          <Button
            background={"blue.500"}
            color={"white"}
            fontWeight={"bold"}
            onClick={onClose}
            w={"120px"}
          >
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
