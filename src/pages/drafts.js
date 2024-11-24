import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

const Drafts = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {props.drafts.map((post) => (
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

export const getServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/drafts");
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      console.error("Expected JSON, but received:", contentType);
      return {
        props: { drafts: [] },
      };
    }

    const drafts = await res.json();
    console.log("drafts: ", drafts);
    return {
      props: { drafts },
    };
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return {
      props: { drafts: [] },
    };
  }
};

export default Drafts;
