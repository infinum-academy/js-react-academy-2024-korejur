"use client";
import { swrKeys } from "@/fetchers/swrKeys";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerFooter,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { mutate } from "swr";

export const MobileSidebarNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
        aria-label="Open menu"
        display={{ base: "block", md: "none" }}
        position="fixed"
        top="20px"
        right="20px"
        zIndex="overlay"
        backgroundColor="dark_purple"
        color="white"
        size="md"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent backgroundColor="purple">
            <DrawerCloseButton color="white" />
            <DrawerHeader />
            <DrawerBody>
              <VStack
                spacing={8}
                align="stretch"
                pl={3}
                pt={5}
                textStyle="subtitle"
              >
                <Link href="/shows" passHref>
                  <Button
                    as="a"
                    variant={
                      isActive("/shows")
                        ? "activeMobileSidebar"
                        : "mobileSidebar"
                    }
                    onClick={onClose}
                  >
                    All shows
                  </Button>
                </Link>
                <Link href="/shows/top-rated" passHref>
                  <Button
                    as="a"
                    variant={
                      isActive("/shows/top-rated")
                        ? "activeMobileSidebar"
                        : "mobileSidebar"
                    }
                    onClick={onClose}
                  >
                    Top rated
                  </Button>
                </Link>
                <Link href="">
                  <Button
                    as="a"
                    variant={
                      isActive("") ? "activeMobileSidebar" : "mobileSidebar"
                    }
                    onClick={onClose}
                  >
                    My profile
                  </Button>
                </Link>{" "}
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Box bottom="20px" width="100%">
                <Button
                  variant="logout"
                  backgroundColor="purple"
                  mb={3}
                  onClick={() => {
                    localStorage.removeItem("client");
                    localStorage.removeItem("access-token");
                    localStorage.removeItem("uid");
                    mutate(swrKeys.user, { revalidate: false });
                  }}
                >
                  Log out
                </Button>
              </Box>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
