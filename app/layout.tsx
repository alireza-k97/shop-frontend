import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/providers/QueryProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "فروشگاه",
  description: "فروشگاه آنلاین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
