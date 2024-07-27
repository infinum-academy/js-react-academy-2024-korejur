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
  Link,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
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
        top="15px"
        right="10px"
        zIndex="overlay"
        backgroundColor="transparent"
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
          <DrawerContent backgroundColor="my_purple">
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
                <Link href="/shows">
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
                <Link href="/shows/top-rated">
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
                <Link href="/profile">
                  <Button
                    as="a"
                    variant={
                      isActive("/profile") ? "activeMobileSidebar" : "mobileSidebar"
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
                  backgroundColor="my_purple"
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