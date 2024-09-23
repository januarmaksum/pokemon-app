import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import "../app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ProgressBar
          key={Date.now()}
          height="3px"
          color="#FF0000"
          options={{ showSpinner: false }}
          shallowRouting
          disableSameURL
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
