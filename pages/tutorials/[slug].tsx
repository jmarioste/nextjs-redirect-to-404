import { GetStaticPaths, GetStaticProps } from "next";

import React from "react";
import { getPostBySlug as getTutorialBySlug } from "../../data/getPostBySlug";
import { Post as Tutorial } from "../../data/Post";

type TutorialPageProps = {
  tutorial: Tutorial;
};
const TutorialPage = (props: TutorialPageProps) => {
  return (
    <div>
      <h1>{props.tutorial?.slug}</h1>
      <p>{props.tutorial?.content}</p>
    </div>
  );
};

export default TutorialPage;

export const getStaticPaths: GetStaticPaths = async ()=> {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps<TutorialPageProps> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const post = getTutorialBySlug(slug) ?? null;

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tutorial: post,
    },
  };
};
