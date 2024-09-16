"use client"

import { Roboto } from "next/font/google"
// 전역 css
import "./styles/globals.css";
import SideNavigation from "@/components/common/navigation/SideNavigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";


const roboto = Roboto({ subsets : ["latin"], weight : ["400", "500", "700"]})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
