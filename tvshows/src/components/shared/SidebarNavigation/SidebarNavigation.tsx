"use client";
import { swrKeys } from "@/fetchers/swrKeys";
import { Box, Button, Flex, VStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mutate } from "swr";

export const SidebarNavigation = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <Flex
        flexDirection="column"
        position="fixed"
        justifyContent="space-between"
        top="0"
        left="0"
        bottom="0"
        width="20vw"
        height="100vh"
        paddingTop="20px"
        paddingX="10px"
        backgroundColor="dark_purple"
        flexWrap="wrap"
      >
        <VStack spacing={8} align="stretch" pl={3} pt={5} textAlign="left">
          <Box textStyle="h1">
            <Image src="/images/logo_svg.svg" alt="TV Shows App logo"></Image>
          </Box>
          <Link href="/shows" passHref>
            <Button
              as="a"
              variant={isActive("/shows") ? "activeSidebar" : "sidebar"}
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
            >
              Top rated
            </Button>
          </Link>
          <Link href="/profile" passHref>
            <Button
              as="a"
              variant={isActive("/profile") ? "activeSidebar" : "sidebar"}
            >
              My profile
            </Button>
          </Link>
        </VStack>

        <Box bottom="20px" width="100%">
          <Button
            variant="logout"
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
      </Flex>
    </>
  );
};
