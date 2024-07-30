import {
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
import { useState } from "react";

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerUpload: (file: File) => void;
}

export const UploadPhotoModal = ({
  isOpen,
  onClose,
  triggerUpload,
}: UploadPhotoModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (selectedFile) {
      triggerUpload(selectedFile);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple_2">Upload Profile Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="purple_2">
          <Input type="file" onChange={() => {}} />
        </ModalBody>
        <ModalFooter color="purple_2">
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="solid"
            onClick={handleUpload}
            isDisabled={!selectedFile}
          >
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
