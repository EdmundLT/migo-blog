import { groq } from "next-sanity";
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
    }
    else {
      return ""
    }
  };
  return (
    <head>
      <title>{post.title}</title>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateQaStructuredData() }}
      ></script>
    </head>
  );
}
