"use client"
import { gql } from "@apollo/client";
import { useState, useEffect } from "react";
import BlogList from "../../components/BlogList";
import { client } from "../../lib/client";

export default function HomePage() {
  const [blogPosts, setBlogPosts] = useState([]);

  function getPortfolioList() {
    client
      .query({
        query: gql`
        query ($preview: Boolean){
          blogsCollection(preview: $preview) {
            items {
              title
              body {
                json
              }
              slug
              categories
              mainImage {
                url
              }
              description
              createdAt
            }
          }
        }
        `,
      })
      .then((result) => {
        console.log(result.data.blogsCollection.items);
        setBlogPosts(result.data.blogsCollection.items);
      });
  }

  useEffect(() => {
    getPortfolioList();
  }, []);

    return (
      <div>
        <BlogList posts={blogPosts} />
      </div>
    );
  }
// }
