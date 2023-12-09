import { Nunito } from 'next/font/google'
import './globals.css'
import Sidebar from "@/app/components/Sidebar/sidebar";
import GlobalStyleProvider from "@/app/providers/globalStyleProvider";
import ContextProvider from "@/app/providers/contextProvider";
import {auth, ClerkProvider} from "@clerk/nextjs";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ['latin']
})

export const metadata = {
  title: 'AnimeLife',
  description: 'Record your anime life',
}

export default function RootLayout({ children }) {
  const {userId} = auth()

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                crossOrigin="anonymous" referrerPolicy="no-referrer"/>
        </head>
        <body className={nunito.className}>
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar/>}
              {children}
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
