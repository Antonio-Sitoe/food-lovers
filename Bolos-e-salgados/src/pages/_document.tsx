import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&family=Lobster&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="logo.svg" />
        <script
          type="text/javascript"
          src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js"
          async
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
