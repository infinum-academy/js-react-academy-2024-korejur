// components/shared/SidebarNavigation/MobileDrawer.tsx
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
    IconButton,
    Link,
    VStack,
    useDisclosure
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";

export const MobileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useState(null);
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
                    variant={isActive("/shows") ? "activeSidebar" : "sidebar"}
                    onClick={onClose}
                  >
                    All shows
                  </Button>
                </Link>
                <Link href="/shows/top-rated" passHref>
                  <Button
                    as="a"
                    variant={
                      isActive("/shows/top-rated") ? "activeSidebar" : "sidebar"
                    }
                    onClick={onClose}
                  >
                    Top rated
                  </Button>
                </Link>
                <Link href="" passHref>
                  <Button
                    as="a"
                    variant={isActive("") ? "activeSidebar" : "sidebar"}
                    onClick={onClose}
                  >
                    My profile
                  </Button>
                </Link>{" "}
              </VStack>

              <Box bottom="20px" width="100%" position="fixed">
                {/*znam da ne bi trebao ici fixed, ali onaj nacin s flexom kao u obicnom sidebaru ne radi? */}
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
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
