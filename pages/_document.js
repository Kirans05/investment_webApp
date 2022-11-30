// import * as React from "react";
// import Document, { Html, Head, Main, NextScript } from "next/document";
// import createEmotionServer from "@emotion/server/create-instance";
// import createEmotionCache from "../src/createEmotionCache";

// export default class MyDocument extends Document {
//  render() {
//    return (
//      <Html lang="en">
//        <Head>
//          {this.props.emotionStyleTags}
//        </Head>
//        <body>
//          <Main />
//          <NextScript />
//        </body>
//      </Html>
//    );
//  }
// }

// MyDocument.getInitialProps = async (ctx) => {
//  const originalRenderPage = ctx.renderPage;

//  const cache = createEmotionCache();
//  const { extractCriticalToChunks } = createEmotionServer(cache);

//  ctx.renderPage = () =>
//    originalRenderPage({
//      enhanceApp: (App) =>
//        function EnhanceApp(props) {
//          return <App emotionCache={cache} {...props} />;
//        },
//    });

//  const initialProps = await Document.getInitialProps(ctx);

//  const emotionStyles = extractCriticalToChunks(initialProps.html);
//  const emotionStyleTags = emotionStyles.styles.map((style) => (
//    <style
//      data-emotion={`${style.key} ${style.ids.join(" ")}`}
//      key={style.key}
//      dangerouslySetInnerHTML={{ __html: style.css }}
//    />
//  ));

//  return {
//    ...initialProps,
//    emotionStyleTags,
//  };
// };
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
