import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Arjun Vinod | Photography Portfolio",
  description: "Capturing moments, emotions, and stories through the lens.",
  keywords: ["Photography", "Portfolio", "Gallery", "Arjun Vinod"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
