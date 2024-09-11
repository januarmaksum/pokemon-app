import * as React from "react";
import Head from "next/head";
import Header from "./Header";
import BottomBar from "./BottomBar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title = "" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <Header />
      {children}
      <BottomBar />
    </>
  );
};

export default Layout;
