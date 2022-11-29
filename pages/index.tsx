import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { client } from "../lib/client";

export type PostData = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export const getStaticProps: GetStaticProps<{
  allPostsData: PostData;
}> = async () => {
  const data = await client.get({ endpoint: "posts" });
  const allPostsData = data.contents;
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-lg">
        <p>Hello, I'm Kohei! I'm new to web frontend developer.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className="text-lg pt-px">
        <h2 className="text-2xl font-semibold my-4 mx-0">Blog</h2>
        <ul className="list-none p-0 m-0">
          {allPostsData.map(({ id, publishedAt, title }) => (
            <EachPageLink
              key={id}
              id={id}
              publishedAt={publishedAt}
              title={title}
            />
          ))}
        </ul>
      </section>
    </Layout>
  );
}

const EachPageLink = ({
  id,
  title,
  publishedAt,
}: {
  id: string;
  title: string;
  publishedAt: string;
}) => (
  <li className="m-0 mb-6">
    <Link
      className="text-black block p-3 shadow-md bg-slate-50 hover:shadow-lg duration-300"
      href={`/posts/${id}`}
    >
      <p className="font-bold pt-0 pb-0 inline-block">{title}</p>
      <br />
      <div className="text-neutral-500">
        Published at: <Date dateString={publishedAt} />
      </div>
    </Link>
  </li>
);
