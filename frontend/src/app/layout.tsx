import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sujeito Pizza - A melhor pizza d região",
  description: "A melhor pizzaria da região",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
