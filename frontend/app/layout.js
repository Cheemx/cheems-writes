import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SpiderCanvas from "@/components/spider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cheems-Writes",
  description: "Where I'll try to get Employed!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Full-screen Spider Background */}
          <div className="fixed top-0 left-0 w-full h-full">
            <SpiderCanvas />
          </div>

          {/* Content overlays on top */}
          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen flex flex-col">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
