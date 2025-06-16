"use client";

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const HubSpotChat = () => {

  const pathName = usePathname()

  return (
    !pathName.match("pos") && !pathName.match("admin") &&
    <>
      <Script
        id="hs-script-loader"
        src="//js-eu1.hs-scripts.com/146375196.js"
        strategy="afterInteractive"
        async
        defer
      />
    </>
  );
};


export default HubSpotChat;
