/* eslint-disable react/no-children-prop */
import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

const Post = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Post;
