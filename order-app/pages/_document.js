import { Html, Head, Main, NextScript } from "next/document";

//_document.js dosyası, Next.js uygulamanızın HTML belgesinin özelleştirilmesine olanak tanıyan bir dosyadır. Bu dosya, uygulamanızın SEO dostu olmasını ve daha iyi bir performans göstermesini sağlayabilir.
// belgenizin başlığını, açıklamasını ve anahtar kelimelerini özelleştirerek, arama motorlarında daha iyi sıralamalara sahip olabilirsiniz.
//Tüm sayfalarda gosterılecek seylerı de buraya yazarız font family icon dosyaları css kutuphanelerı vs. <link> ile verecegızız seyler.
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
         {/*! Font Awesome CDN  */}
         <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
          integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
