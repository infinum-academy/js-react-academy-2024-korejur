"use client";
import { Box, chakra, useMediaQuery } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { SidebarNavigation } from "../components/shared/SidebarNavigation/SidebarNavigation";
import { Providers } from "./providers";
import { MobileDrawer } from "@/components/shared/SidebarNavigation/MobileSidebarNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login" && pathname !== "/register";
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <html lang="en">
      <body>
        <Providers>
          {showSidebar && !isLargerThan768 && <MobileDrawer />}
          {showSidebar && isLargerThan768 && <SidebarNavigation />}
          <Box marginLeft={showSidebar && isLargerThan768 ? "30vh" : "0"}>
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
