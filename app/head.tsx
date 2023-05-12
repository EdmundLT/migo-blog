import Script from "next/script";

export default function Head() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NF3RTWK');`,
        }}
      ></Script>
      {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2632815382162562"
     crossOrigin="anonymous"></script> */}

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2632815382162562"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <title>Otto Notes｜加拿大移民生活｜多倫多工作</title>
      <meta
        name="description"
        content="軟體工程師 x 數據分析師｜香港情侶加拿大移民生活分享，多倫多留學讀書、工作心得。"
      ></meta>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
