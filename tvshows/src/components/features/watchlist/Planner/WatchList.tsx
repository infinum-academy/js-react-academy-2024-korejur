"use client";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { WatchListButtons } from "./components/WatchListButtons";
import { WatchListProgress } from "./components/WatchListProgress";
import { WatchListStepper } from "./components/WatchListStepper";
import { WatchListContextProvider } from "./components/WatchListContextProvider";

export const WatchList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <WatchListContextProvider closeModal={onClose}>
      <Button onClick={onOpen}>MY WATCH LIST</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="fit-content" m={10}>
          <ModalHeader color="my_purple">Watch List</ModalHeader>
          <ModalBody color="my_purple">
            <WatchListStepper />
          </ModalBody>
          <ModalFooter>
            <Flex direction="column" width="100%" gap={3}>
              <WatchListProgress />
              <WatchListButtons />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </WatchListContextProvider>
  );
};
