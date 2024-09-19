import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Component {...pageProps} />
      <ProgressBar
        key={Date.now()}
        height="2px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
        disableSameURL
      />
    </ThemeProvider>
  );
}

export default MyApp;
