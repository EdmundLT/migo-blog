"use client";
import { gql } from "@apollo/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { client } from "../../../../lib/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Head } from "next/document";
type Props = {
  params: {
    slug: string;
  };
};
type Iqa = {
  question: string;
  answer: string;
};

type IblogPost = {
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
function Post({ params }: Props) {
  let jsonLd;
  const [blogPost, setBlogPost] = useState<IblogPost>({
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
    qa: [],
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
          slug: params.slug,
        },
      })
      .then((result) => {
        console.log(result.data.blogsCollection.items[0]);
        setBlogPost(result.data.blogsCollection.items[0]);

        jsonLd = {
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
        };
      });
  }

  useEffect(() => {
    getBlog();
  }, []);
  const Heading1 = ({ children }: any) => (
    <h1 className="py-2 text-3xl">{children}</h1>
  );
  const Heading2 = ({ children }: any) => (
    <h2 className="py-2 text-2xl">{children}</h2>
  );
  const Heading3 = ({ children }: any) => (
    <h3 className="py-2 text-xl">{children}</h3>
  );
  const Text = ({ children }: any) => (
    <p className="py-2 text-lg">{children}</p>
  );

  const RichTextoptions = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <Heading1>{children}</Heading1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <Heading2>{children}</Heading2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <Heading3>{children}</Heading3>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <Text>{children}</Text>,
    },

    renderText: (text: any) => text.replace("!", "?"),
  };

  return (
    <div className="px-10 pb-20">
      <section className="space-y-3">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-50 p-10 z-0 rounded-sm">
            <Image
              priority={true}
              className="object-cover object-center mx-auto"
              src={blogPost!.mainImage.url}
              alt={blogPost!.mainImage.title}
              fill
            />
          </div>
          <section className="p-5 pb-10 bg-black w-full">
            <div>
              {/* <h1 className="pt-10">{post.description}</h1> */}
              <div className="flex items-center justify-end space-x-2">
                {blogPost!.categories.map((category) => (
                  <p
                    key={category}
                    className="z-10 badge badge-lg badge-accent text-white px-3 py-1 
                        rounded-full text-sm font-semibold mt-4 "
                  >
                    {category}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-y-5 pt-10">
              <h1 className="text-2xl md:text-3xl text-white z-10">
                {blogPost!.title}
              </h1>
              {/* <p>
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p> */}
            </div>
          </section>
        </div>
        <div className="py-2 text-black">
          {/* <PortableText value={blogPost.body.json} components={RichTextComponent} /> */}

          {documentToReactComponents(blogPost.body.json!, RichTextoptions)}
        </div>
      </section>
    </div>
  );
}

export default Post;
