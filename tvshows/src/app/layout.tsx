"use client";
import { Box, chakra } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
import { SidebarNavigation } from "../components/shared/SidebarNavigation/SidebarNavigation";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login" && pathname !== "/register";

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {showSidebar && <SidebarNavigation />}
          <Box marginLeft={showSidebar ? "30vh" : "0"}>
            <chakra.main
              backgroundColor="#1e024d"
              color="aliceblue"
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
