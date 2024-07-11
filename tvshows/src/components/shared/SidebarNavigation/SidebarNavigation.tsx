"use client";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";

export const SidebarNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Box position="fixed" top="20px" left="20px">
        <IconButton ref={btnRef} onClick={onOpen} m={4} icon={<HamburgerIcon />} aria-label={"Open menu"}/>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent backgroundColor="#110429" textColor="aliceblue">
          <DrawerHeader fontSize="3xl" fontWeight="bold" mt={5} mb={5}>
            TV Shows App
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={8} align="stretch">
              <Link href={"/shows"}>All shows</Link>
              <Link href={"/shows/top-rated"}>Top rated</Link>
              <Link href={""}>My profile</Link>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              bg="#110429"
              textColor="aliceblue"
              mr={3}
              onClick={() => {}}
            >
              Log out
            </Button>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
