import Head from 'next/head'

interface Props {
  description: string,
  title: string,
}

const Seo = ({ description, title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="https://twitter.com/Pancho_xor" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

Seo.defaultProps = {
  description: "Si no sabes que serie o pelicula empezar a ver, este es tu lugar",
  title: "¿Qué puedo ver?",
}

export default Seo;
