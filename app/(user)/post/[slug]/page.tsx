import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import React from "react";
import { RichTextComponent } from "../../../../components/RichTextComponent";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const query = groq`
  *[_type=='post']
  {slug}
  `;

  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}
async function Post({ params: { slug } }: Props) {
  const query = groq`
     *[_type=='post' && slug.current == $slug][0]
     {
        ...,
        author->,
        categories[]->
     }
    `;

  const post: Post = await client.fetch(query, { slug });
  return (
    <div className="px-10 pb-20">
      <Head>
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
        <title>asd</title>
      </Head>
      <section className="space-y-2 border text-black">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover obejct-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>
          <section className="p-5 bg-[#7DB9B6] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <h1 className="text-3xl font-light">{post.title}</h1>
              <p>
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex item-center space-x-2 pt-4">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span>ET</span>
                </div>
              </div>
              {/* Author Name */}
              <div className="w-64">
                <h3 className="text-md font-light pt-3">{post.author.name}</h3>
              </div>
            </div>

            <div>
              <h1 className="pt-10">{post.description}</h1>
              <div className="flex items-center justify-end space-x-2">
                {post.categories.map((category) => (
                  <p
                    key={category._id}
                    className=" bg-gray-800 text-white px-3 py-1 
                        rounded-full text-sm font-semibold mt-4"
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <PortableText value={post.body} components={RichTextComponent} />
    </div>
  );
}

export default Post;
