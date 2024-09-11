import * as React from "react";
import Head from "next/head";
import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title = "" }: LayoutProps) => {
  return (
    <html suppressHydrationWarning>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default Layout;
