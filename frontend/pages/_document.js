import { Html, Head, Main, NextScript } from "next/document";
import { InitializeColorMode } from "theme-ui";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <InitializeColorMode />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export const getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
};

export default Document;
