import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuestionProvider } from "./contexts/QuestionProvider";
import { AnswerProvider } from "./contexts/AnswerProvider";
import { UserProvider } from "./contexts/UserProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <UserProvider>
          <QuestionProvider>
            <body className={inter.className}>{children}</body>
          </QuestionProvider>
      </UserProvider>
    </html>
  );
}
