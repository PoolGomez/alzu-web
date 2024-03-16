'use client';
import { SessionProvider } from "next-auth/react";

export function AppProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <SessionProvider>{children}</SessionProvider>
    )
}