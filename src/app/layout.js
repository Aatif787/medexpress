import { ClerkProvider } from '@clerk/nextjs'
import './globals.css';
import { Poppins, Inter, Montserrat } from "next/font/google";
import ClientLayout from "./ClientLayout";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-montserrat" });

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
        <body className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
