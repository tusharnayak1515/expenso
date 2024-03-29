import { Providers } from "@/redux/provider";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const HomeLayout = dynamic(() => import("@/components/layouts/HomeLayout"), {
  ssr: false,
});

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import RouteChangeHandler from "@/components/RouteChangeHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Expenso",
    template: "Expenso - %s"
  },
  description: "Expenso helps you track personal finances and expenses online. Monitor spending, create budgets, visualize expenses, and reach your financial goals.",
  keywords: "expenso, expenso jet, expense tracker, budget"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* {process.env.NEXT_PUBLIC_NODE_ENV === "production" && (
        <Script
          id="Adsense-id"
          data-ad-client="ca-pub-5735202116103600"
          async={true}
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      )} */}
      {/* {process.env.NEXT_PUBLIC_NODE_ENV === "production" && (
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5735202116103600"
          crossOrigin="anonymous"
        ></script>
      )} */}
      <body className={inter.className}>
        <RouteChangeHandler />
        <Providers>
          <Navbar />
          <HomeLayout>{children}</HomeLayout>
          <div id="modal"></div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
