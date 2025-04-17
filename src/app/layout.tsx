import { poppins } from "@/fonts";
import ReduxStoreProvider from "@/lib/redux/ReduxStoreProvider";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: 'Radiant Repose | Wellness, Beauty & Luxury',
  description: 'Radiant Repose is Nigeria’s premier destination for holistic wellness, luxury self-care, and pharmaceutical services—offering spa bookings, pharmacy consultations, and luxury product orders all in one elegant platform.',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxStoreProvider>
        <body
          className={`${poppins.className} min-h-screen`}
        >
          {children}
        </body>
      </ReduxStoreProvider>
    </html>
  );
}
