"use client";

import Script from 'next/script';

const HubSpotChat = () => {
  return (
    <>
      <Script
        id="hs-script-loader"
        src="//js-eu1.hs-scripts.com/146373820.js"
        strategy="afterInteractive"
        async
        defer
      />
    </>
  );
};


export default HubSpotChat;
