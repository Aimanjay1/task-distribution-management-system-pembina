import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "./_components/sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PEMBINA Admin",
  description: "PSPB recruitment and management for PSM PEMBINA IIUM Chapter",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Browser extensions (for example Liner) add attributes to <html> and <body>
  // before React loads. suppressHydrationWarning ignores those attribute
  // differences on these two tags only; mismatches inside the page still warn.
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col md:flex-row" suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </body>
    </html>
  );
}
