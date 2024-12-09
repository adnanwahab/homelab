import { SpeedInsights } from "@vercel/speed-insights/next";


import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

import { Analytics } from "@vercel/analytics/react";
// 1. dynabot - $300 nanosaurs
// 2. three.js collaborative canvas - type shit - get 3d world --- adds to everyones animal cross + sims + minecraft
//3. llama-tools = labels for reasoning -- 100% free open source
//
/* <meta property="og:title" content="Robotics and Biotech Innovations | Dynamciland" />
<meta
  property="og:description"
  content="Explore the latest advancements in robotics and biotech at Dynamciland."
/>
<meta property="og:image" content="https://www.dynamciland.com/og-image.jpg" />
<meta property="og:url" content="https://www.dynamciland.com/" />
<meta property="og:type" content="website" />

{/* Twitter Card */
/* <meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Robotics and Biotech Innovations | Dynamciland" />
<meta
  name="twitter:description"
  content="Explore the latest advancements in robotics and biotech at Dynamciland."
/>
<meta name="twitter:image" content="https://www.dynamciland.com/twitter-image.jpg" /> */

// export const metadata: Metadata = {
//   title: "Dynabot.dev - AI+Robotics+Biotech inspired by dynamicland",
//   description: "Dynabot.dev - AI+Robotics+Biotech inspired by dynamiclan",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <Head>
          <title>Dynabot.dev = Robotics Simulation As a Service</title>
          <meta
            name="description"
            content="Dynabot.dev - AI+Robotics+Biotech inspired by dynamiclan"
          />
          <link rel="icon" href="/public/favicon/favicon.svg" />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ok8h7h9e0q");
            `,
            }}
          />
          <meta
            name="keywords"
            content="Dynabot.dev - AI+Robotics+Biotech inspired by dynamicland"
          />
          <link rel="canonical" href="https://www.dynabot.dev/" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Dynamciland",
                url: "https://www.dynamciland.com",
                logo: "https://www.dynamciland.com/logo.png",
                sameAs: [
                  "https://www.facebook.com/dynamciland",
                  "https://www.twitter.com/dynamciland",
                ],
                description:
                  "Dynamciland is the hub of innovation in robotics and biotech.",
              }),
            }}
          />
        </Head>
        <body className={` antialiased`}>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
  );
}
