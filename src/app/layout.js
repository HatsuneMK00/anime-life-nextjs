import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from "@/app/components/Sidebar/sidebar";
import GlobalStyleProvider from "@/app/providers/globalStyleProvider";
import ContextProvider from "@/app/providers/contextProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AnimeLife',
  description: 'Record your anime life',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <GlobalStyleProvider>
            <Sidebar />
            {children}
          </GlobalStyleProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
