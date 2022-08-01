import React, { useEffect } from "react";
import NProgress from "nprogress";
// next
import type { AppProps } from "next/app";
import { Router } from "next/router";
// hooks
import useDarkMode from "use-dark-mode";

import AppLayout from "layouts/app-layout";
// redux
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "redux/store";
// context providers
import { ThemeProvider } from "styled-components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// style
import { GlobalStyle } from "theme/global.state";
// themes
import { defaultTheme, darkTheme } from "theme";
// ----------------------------------------------------------------------

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function APP({ Component, pageProps }: AppProps) {
  const darkMode = useDarkMode(true);
  const themeMode = darkMode.value ? darkTheme : defaultTheme;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={themeMode}>
        <PersistGate loading={<div />} persistor={persistor}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </PersistGate>
        <GlobalStyle />
      </ThemeProvider>
    </ReduxProvider>
  );
}
export default APP;
