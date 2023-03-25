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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
