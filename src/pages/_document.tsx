import {
    DocumentHeadTags,
    type DocumentHeadTagsProps,
    documentGetInitialProps,
  } from "@mui/material-nextjs/v14-pagesRouter";
  import {
    Html,
    Head,
    Main,
    NextScript,
    type DocumentContext,
    type DocumentInitialProps,
  } from "next/document";
  // or `v1X-pagesRouter` if you are using Next.js v1X
  
  export default function MyDocument(
    props: DocumentInitialProps & DocumentHeadTagsProps,
  ) {
    return (
      <Html lang="en">
        <Head>
          <DocumentHeadTags {...props} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  
  MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const finalProps = await documentGetInitialProps(ctx);
    return finalProps;
  };