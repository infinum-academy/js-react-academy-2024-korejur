"use client";
import { Box, Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarNavigation = () => {
  const pathname = usePathname();

  const isActive = (href: string) => ({
    padding: "10px 16px",
    borderRadius: "10px",
    backgroundColor: pathname === href ? "#1e024d" : "transparent",
  });

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      bottom="0"
      width="30vh"
      height="100vh"
      backgroundColor="#110429"
      color="aliceblue"
      paddingTop="20px"
      paddingX="10px"
    >
      <Box fontSize="3xl" fontWeight="bold" p={5} textAlign="center">
        TV Shows App
      </Box>

      <VStack spacing={8} align="stretch" pl={5} pt={5} fontSize="xl">
        <Link href="/shows" style={isActive("/shows")}>
          All shows
        </Link>
        <Link href="/shows/top-rated" style={isActive("/shows/top-rated")}>
          Top rated
        </Link>
        <Link href="" style={isActive("")}>
          My profile
        </Link>
      </VStack>

      <Box
        position="absolute"
        bottom="20px"
        width="100%"
        textAlign="right"
        pr={5}
      >
        <Button bg="#110429" textColor="aliceblue" mr={3} onClick={() => {}}>
          Log out
        </Button>
      </Box>
    </Box>
  );
};
