import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { RootLayout } from "@/components/layout/RootLayout";

export const metadata: Metadata = {
  title: "OrderHop",
  description: "Order management system",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}
