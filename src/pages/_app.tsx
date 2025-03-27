import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Lexend } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const lexend = Lexend({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: "network-only" },
      query: { fetchPolicy: "network-only" },
    },
  });

  return (
    <main className={lexend.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </main>
  );
}
