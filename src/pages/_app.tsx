import { AppProps } from "next/app";
import { SearchContextProvider } from "../contexts/SearchContext";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <Component {...pageProps} />
    </SearchContextProvider>
  );
}

export default MyApp;
