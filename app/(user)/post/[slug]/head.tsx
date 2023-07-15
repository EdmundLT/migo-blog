import { groq } from "next-sanity";
import Script from "next/script";
import { client } from "../../../../lib/sanity.client";

async function getPost(slug: string) {
  const query = groq`
  *[_type=='post' && slug.current == $slug][0]
  {
     ...,
     author->,
     categories[]->
  }
 `;
  const post: Post = await client.fetch(query, { slug });
  return post;
}

export default async function Head({ params }: { params: { slug: string } }) {
  const encodedSlug = decodeURIComponent(params.slug);
  const post = await getPost(encodedSlug);
  const generateQaStructuredData = () => {
    if (post.qa) {
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.qa.map(({ question, answer }) => {
          return {
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          };
        }),
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
      <title>{post.title}</title>
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
      <meta name="description" content={post.description}></meta>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateQaStructuredData() }}
      ></script>
    </head>
  );
}
