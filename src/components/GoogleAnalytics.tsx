// components/GoogleAnalytics.tsx
"use client";

import Script from "next/script";
import { IS_GATAG } from "../../libs/gtag";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-6K0S02QDED"
      ></Script>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${IS_GATAG}');
           `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
