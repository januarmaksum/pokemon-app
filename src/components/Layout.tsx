import * as React from "react";
import Head from "next/head";
import Header from "./Header";
import BottomBar from "./BottomBar";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  lang?: string;
}

const Layout = ({ children, title = "", lang = "en" }: LayoutProps) => {
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="View a list of Pokémon, see details about each Pokémon, and catch Pokémon to store in their own collection."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <Header />
      {children}
      <BottomBar />
      <Toaster />
    </>
  );
};

export default Layout;
