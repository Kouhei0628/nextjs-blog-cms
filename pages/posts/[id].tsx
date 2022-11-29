import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { PostData } from "..";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { client } from "../../lib/client";
import styles from "../../styles/Posts.module.css";

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      {postData ? (
        <>
          <Head>
            <title>{postData.title}</title>
          </Head>
          <PostArticle
            title={postData.title}
            publishedAt={postData.publishedAt}
            content={postData.content}
          />
        </>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
}

const PostArticle = ({
  title,
  publishedAt,
  content,
}: {
  title: string;
  publishedAt: string;
  content: string;
}) => (
  <article>
    <h1 className="text-4xl leading-tight font-extrabold tracking-tighter m-0 mt-4">
      {title}
    </h1>
    <div className="text-neutral-500">
      Published at: <Date dateString={publishedAt} />
    </div>
    <div
      className={`${styles.innerHtml} mt-8`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </article>
);

const NotFound = () => (
  <>
    <Head>
      <title>Content Not Found</title>
    </Head>
    <div className="text-2xl font-semibold text-red-500">
      Error: Content Not Found
    </div>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "posts" });
  const paths = data.contents.map(({ id }: { id: string }) => `/posts/${id}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  postData: PostData | null;
}> = async ({ params }) => {
  if (params) {
    const id = typeof params.id === "string" ? params.id : "";
    const postData = await client.get({
      endpoint: "posts",
      contentId: id,
    });
    return {
      props: {
        postData,
      },
    };
  }
  return {
    props: { postData: null },
  };
};
