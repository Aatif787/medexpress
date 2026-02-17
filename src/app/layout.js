import { ClerkProvider } from '@clerk/nextjs'
import './globals.css';
import { Outfit } from "next/font/google";
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
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
