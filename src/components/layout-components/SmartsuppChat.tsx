"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    _smartsupp?: {
      key?: string;
      orientation?: "left" | "right";
      offsetX?: number;
      offsetY?: number;
      [key: string]: any;
    };
    smartsupp?: any;
  }
}

export default function SmartsuppChat() {
  const pathname = usePathname();

  // Hide in admin, pos, cart-monitor, auth portals
  const isExcluded =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/pos") ||
    pathname.startsWith("/cart-monitor") ||
    pathname.startsWith("/auth");

  if (isExcluded) return null;

  return (
    <>
      <Script
        id="smartsupp-chat-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window._smartsupp = window._smartsupp || {};
            window._smartsupp.key = '9b162a47c01abfd1da5606ded8d02443c55a6610';
            window._smartsupp.orientation = 'left';
            window._smartsupp.offsetX = 84;
            window._smartsupp.offsetY = 16;
            window.smartsupp || (function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `,
        }}
      />
    </>
  );
}

