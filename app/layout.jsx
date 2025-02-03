"use client"

import { Roboto } from "next/font/google"
import SideNavigation from "@/components/common/navigation/SideNavigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import "./styles/globals.css";


const roboto = Roboto({ subsets : ["latin"], weight : ["400", "500", "700"]})

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={roboto.className}>
        <SessionProvider>
        <Provider store={store}>
        <SideNavigation/>
          {children}
        </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
