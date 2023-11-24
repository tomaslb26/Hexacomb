"use client";

import styles from "@/styles/Layout/Layout.module.css";
import Navbar from "../Nav/Navbar";
import { User } from "@/types/user";
import { createContext } from "react";

export const CookiesContext = createContext<{ delete: () => void | undefined }>({
    delete: () => undefined
});

export default function Layout(props: {children?: React.ReactNode, navBar?: boolean, user?: User, deleteCookies?: () => void}) {

    const {navBar = true, user} = props;

    return (
        <CookiesContext.Provider value={{
            delete: props.deleteCookies ?? (() => undefined)
        }}>
            <div className={styles['layout-wrapper']}>
                {navBar && <Navbar user={user} />}
                <main className={styles['layout-main']}>
                    {props.children}
                </main>
            </div>
        </CookiesContext.Provider>
    )

}