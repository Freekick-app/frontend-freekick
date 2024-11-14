/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head><link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        /> 
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        </Head>  
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
