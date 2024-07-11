import type { Metadata } from "next";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";
import styles from "../../../tvshows/public/styles/page.module.css";
import { SidebarNavigation } from "../components/shared/SidebarNavigation/SidebarNavigation";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TV Shows App",
  description: "TV Shows App made for Infinum React Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <main className={styles.main}>
            <SidebarNavigation />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
