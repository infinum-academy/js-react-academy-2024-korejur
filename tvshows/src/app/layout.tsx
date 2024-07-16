"use client";
import { Box, chakra } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
import { SidebarNavigation } from "../components/shared/SidebarNavigation/SidebarNavigation";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <SidebarNavigation />
          <Box marginLeft="30vh">
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
