import { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
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
      {children}
    </>
  );
};

export default Layout;
