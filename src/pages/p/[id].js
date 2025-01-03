/* eslint-disable react/no-children-prop */
import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";

async function publish(id) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function destroy(id) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const Post = (props) => {
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && (
          <button onClick={() => publish(props.id)}>Publish</button>
        )}
        <button onClick={() => destroy(props.id)}>Delete</button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${context.params.id}`
  );
  const data = await res.json();
  return { props: { ...data } };
};

export default Post;
