import { groq } from "next-sanity";
import React from "react";
import BlogList from "../../../../components/BlogList";
import { client } from "../../../../lib/sanity.client";
type Props = {
  params: {
    slug: string,
    post: []
  };
};
const query = groq`
*[_type=='post'] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;

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

export default async function Category({params: {slug}}:Props) {
  const posts_res = await client.fetch(query);
  const post_to_render :any = []
  posts_res.forEach((post: Post) => {
    post.categories.forEach(category => {
      if (category.description === slug) {
        post_to_render.push(post)
      }
    });

  });
  return (
    <div>
      <BlogList posts={post_to_render} />
    </div>
  );
}
