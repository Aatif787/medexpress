import './globals.css';
import { Outfit } from "next/font/google";
import Link from 'next/link';
import ClientLayout from "./ClientLayout";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "MedExpress | Premium Medicine Delivery",
  description: "Fast, reliable medicine delivery in Domariyaganj.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0f766e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
