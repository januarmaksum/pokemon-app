import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Layout title={pageProps.title || ""}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
