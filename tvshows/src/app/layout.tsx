"use client";
import { MobileSidebarNavigation } from "@/components/shared/SidebarNavigation/MobileSidebarNavigation";
import { Box, chakra, Show } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { SidebarNavigation } from "../components/shared/SidebarNavigation/SidebarNavigation";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar =
    pathname !== "/login" && pathname !== "/register" && pathname !== "/";

  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            marginLeft={
              showSidebar ? { base: "0", md: "20vw", lg: "15vw" } : undefined
            }
          >
            <Show above="md">{showSidebar && <SidebarNavigation />}</Show>
            <Show below="md">{showSidebar && <MobileSidebarNavigation />}</Show>
            <chakra.main
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              padding="5vh"
              bgGradient={
                pathname === "/"
                  ? "linear(to-l, dark_purple, my_purple, light_purple, my_purple, dark_purple)"
                  : undefined
              }
            >
              {children}
            </chakra.main>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
