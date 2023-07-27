import { GetServerSideProps } from "next";
import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const xml = await generateSiteMap();
  console.log(xml);
  ctx.res.setHeader("Content-Type", "text/xml");
  ctx.res.write(xml);
  ctx.res.end();
  return {
    props: {},
  };
};
export default function Sitemap() {
  return null;
}

async function generateSiteMap() {
  const query = groq`
  *[_type=='post']
  {
    ...,
    author->,
    categories[]->
 }
  `;

  const posts: Post[] = await client.fetch(query);

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://otto-notes.com</loc>
     </url>
     <url>
     <loc>https://otto-notes.com/category/immigrant</loc>
 </url>
 <url>
 <loc>https://otto-notes.com/category/Life</loc>
</url>
<url>
<loc>https://otto-notes.com/category/Working</loc>
</url>
<url>
<loc>https://otto-notes.com/category/Study</loc>
</url>
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>https://otto-notes.com/post/${slug.current}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}
