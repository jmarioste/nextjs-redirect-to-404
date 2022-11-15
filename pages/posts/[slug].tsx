import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getPostBySlug } from "../../data/getPostBySlug";
import { Post } from "../../data/Post";

type PostPageProps = {
  post: Post;
};
const PostPage = (props: PostPageProps) => {
  return (
    <div>
      PostPage
      <h1>{props.post?.slug}</h1>
      <p>{props.post?.content}</p>
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  ctx
) => {
  const slug = ctx.params?.slug as string;
  const post = getPostBySlug(slug) ?? null;

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
