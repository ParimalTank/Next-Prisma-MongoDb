import React from "react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

const Blog = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>My Blog</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;

export const getServerSideProps = async () => {
  try {
    const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/feed");
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      console.error("Expected JSON, but received:", contentType);
      return {
        props: { feed: [] },
      };
    }

    const feed = await res.json();
    console.log("feed: ", feed);
    return {
      props: { feed },
    };
  } catch (error) {
    console.error("Error fetching feed:", error);
    return {
      props: { feed: [] },
    };
  }
};
