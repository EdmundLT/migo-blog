import { gql } from "@apollo/client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { client } from "../../../../lib/client";

type IblogPostForQa = {
  title: string;
  body: { json: Document | undefined };
  slug: string;
  categories: string[];
  mainImage: {
    url: string;
    title: string;
  };
  description: string;
  createdAt: string;
  qa: Iqa[];
};

type Iqa = {
  question: string;
  answer: string;
};
export default function Head({ params }: { params: { slug: string } }) {
  const [blogPost, setBlogPost] = useState<IblogPostForQa>({
    title: "",
    body: { json: undefined },
    slug: "",
    categories: [],
    mainImage: {
      url: "",
      title: "",
    },
    description: "",
    createdAt: "",
    qa: [
      {
        question: "",
        answer: "",
      },
    ],
  });

  async function getBlog() {
    params.slug = decodeURIComponent(params.slug);
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
              }
            }
          }
        `,
        variables: {
          slug: decodeURIComponent(params.slug),
        },
      })
      .then((result) => {
        console.log(result.data.blogsCollection.items[0]);
        setBlogPost(result.data.blogsCollection.items[0]);
      });
  }

  useEffect(() => {
    getBlog();
  }, []);

  const generateQaStructuredData = () => {
    if (blogPost.qa) {
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blogPost.qa.map(
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
      });
    } else {
      return "";
    }
  };
  return (
    <head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2632815382162562"
        crossOrigin="anonymous"
      />
      <title>{blogPost.title}</title>
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
      <meta name="description" content={blogPost.description}></meta>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateQaStructuredData() }}
      ></script>
    </head>
  );
}
