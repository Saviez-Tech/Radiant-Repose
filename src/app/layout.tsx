import Footer from "@/components/layout-components/Footer";
import "./globals.css";
import Header from "@/components/layout-components/Header";
import { poppins } from "@/fonts";
import ReduxStoreProvider from "@/lib/redux/ReduxStoreProvider";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AuthUserPersistor from "@/components/layout-components/AuthUserPersistor";
import { cookies } from "next/headers";


export const metadata : Metadata = {
  title: 'Radiant Repose | Wellness, Beauty & Luxury',
  description: 'Radiant Repose is Nigeria’s premier destination for holistic wellness, luxury self-care, and pharmaceutical services—offering spa bookings, pharmacy consultations, and luxury product orders all in one elegant platform.',
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {

  const cookieStore = await cookies()
  const persistedUserData = () => {
    try {
      const cookieValue = cookieStore.get("user_session")?.value;
      if (!cookieValue) return null;
      const userData = JSON.parse(cookieValue)
    
      return !userData.id || !userData.username ? null : userData;

    } catch {
      return null;
    }
  }

  return (
    <html lang="en">
      <ReduxStoreProvider>
        <body
          className={`${poppins.className} min-h-screen bg-white`}
        >
          <Header />
          <Toaster position="top-right" containerStyle={{ fontSize: "14px"}} />
          {children}
          <Footer />
        </body>
        <AuthUserPersistor persistedUserData={persistedUserData()} />
      </ReduxStoreProvider>
    </html>
  )
}
