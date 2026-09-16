<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

=======
import BootstrapClient from "@/components/BootstrapClient";
>>>>>>> a7241388b495671ff166cda30d0bb823fba17ad3
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Next.js with Bootstrap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
