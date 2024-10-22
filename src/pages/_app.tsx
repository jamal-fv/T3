import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";

import { api } from "@/utils/api";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppCacheProvider {...pageProps}>
        <div className={GeistSans.className}>
          <Component {...pageProps} />
        </div>
      </AppCacheProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);