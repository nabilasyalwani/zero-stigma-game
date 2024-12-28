import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Zero Stigma",
  description: "Game for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`bg-black max-h-screen flex flex-col antialiased`}>
        <div className="flex flex-col flex-grow ">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
