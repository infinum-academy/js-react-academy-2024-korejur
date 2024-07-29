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
  const showSidebar = pathname !== "/login" && pathname !== "/register";

  return (
    <html lang="en">
      <body>
        <Providers>
        <Box marginLeft={showSidebar ? { base: "0", md: "20vw" } : undefined}>
          <Show above="md">{showSidebar && <SidebarNavigation />}</Show>
          <Show below="md">{showSidebar && <MobileSidebarNavigation />}</Show>
            <chakra.main
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              padding="5vh"
            >
              {children}
            </chakra.main>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
