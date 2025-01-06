import Head from "next/head";

interface DynamicHeadProps {
  title?: string;
  image?: string;
}

export const DynamicHead = ({ title, image }: DynamicHeadProps) => {
  if (!title) {
    return (
      <Head>
        <title>¿Qué puedo ver?</title>
      </Head>
    );
  }

  return (
    <Head>
      <title>{`${title} | ¿Qué puedo ver?`}</title>
      <meta content={title} property="og:title" />
      <meta content={title} property="og:site_name" />
      <meta content={title} property="twitter:title" />
      <meta content={image} property="og:image" />
    </Head>
  );
};
