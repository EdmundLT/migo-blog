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
async function Post({ params }: Props) {
  const query = groq`
     *[_type=='post' && slug.current == $slug][0]
     {
        ...,
        author->,
        categories[]->
     }
    `;
  params.slug = decodeURIComponent(params.slug);
  const post: Post = await client.fetch(query,  {slug: params.slug} );
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
      </Head>
      <section className="space-y-3">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-50 p-10 z-0 rounded-sm">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>
          <section className="p-5 pb-10 bg-black w-full">
            <div>
              {/* <h1 className="pt-10">{post.description}</h1> */}
              <div className="flex items-center justify-end space-x-2">
                {post.categories.map((category) => (
                  <p
                    key={category._id}
                    className="z-10 badge badge-lg badge-accent text-white px-3 py-1 
                        rounded-full text-sm font-semibold mt-4 "
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-y-5 pt-10">
              <h1 className="text-2xl md:text-3xl text-white z-10">
                {post.title}
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
      </section>
      <div className="py-2">
        <PortableText value={post.body} components={RichTextComponent} />
      </div>
    </div>
  );
}

export default Post;
