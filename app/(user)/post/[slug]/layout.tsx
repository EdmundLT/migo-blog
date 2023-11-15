import { gql } from "@apollo/client";
import { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import Banner from "../../../../components/Banner";
import Footer from "../../../../components/Footer";
import { client } from "../../../../lib/client";
let jsonLd;
type Props = {
  params: {
    slug: string;
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <head>
        <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2632815382162562"
          crossOrigin="anonymous"
        />
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
      </head>
      <body className="max-w-full mx-auto bg-white py-4">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NF3RTWK"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        <main className="max-w-5xl mx-auto">
          <Banner />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  let blog;
  await client
    .query({
      query: gql`
        query ($preview: Boolean, $slug: String!) {
          blogsCollection(preview: $preview, where: { slug: $slug }) {
            items {
              title
              body {
                json
              }
              slug
              categories
              mainImage {
                url
                title
              }
              description
              createdAt
              qa
            }
          }
        }
      `,
      variables: {
        slug: decodeURIComponent(slug),
      },
    })
    .then((result) => {
      console.log(result.data.blogsCollection.items[0]);
      blog = result.data.blogsCollection.items[0];
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blog.qa.map(
          ({ question, answer }: { question: string; answer: string }) => {
            return {
              "@type": "Question",
              name: question,
              acceptedAnswer: {
                "@type": "Answer",
                text: answer,
              },
            };
          }
        ),
      };
      console.log({jsonLd})
    });
  return {
    title: blog.title,
    description: blog.description,
  };
}

{
  /* <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: generateQaStructuredData() }}
></script> */
}
