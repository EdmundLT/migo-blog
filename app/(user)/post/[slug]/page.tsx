import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import Image from "next/image";
import React from "react";
import { RichTextComponent } from "../../../../components/RichTextComponent";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30;

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
    <article className="px-10 pb-20">
      <section className="space-y-2 border text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover obejct-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>
          <section className="p-5 bg-[#4582e3] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <h1 className="text-4xl font-extrabold">{post.title}</h1>
              <p>
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex item-center space-x-2 pt-4">
              <Image
                className="rounded-full"
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
                height={40}
                width={40}
              />
              {/* Author Name */}
              <div className="w-64">
                <h3 className="text-lg font-bold pt-1">{post.author.name}</h3>
              </div>
            </div>

            <div>
              <h2 className="italic pt-10">{post.description}</h2>
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
    </article>
  );
}

export default Post;