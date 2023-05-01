import Head from 'next/head';

interface SeoProps {
  description?: string;
  title?: string;
  logoUrl?: string;
  url?: string;
}

const Seo = ({ description, title, logoUrl, url }: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content="website" property="og:type" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={title} property="og:site_name" />
      <meta content="summary" property="twitter:card" />
      <meta content="@Pancho_xor" property="twitter:creator" />
      <meta content={title} property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <meta content={logoUrl} property="twitter:image" />
      <meta content={title} property="og:title" />
      <meta content={logoUrl} property="og:image" />
      <meta content={description} property="og:description" />
      <meta content={url} property="og:url" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
  );
};

Seo.defaultProps = {
  description: 'Si no sabes que serie o pelicula empezar a ver, este es tu lugar',
  title: '¿Qué puedo ver?',
  logoUrl: 'https://i.ibb.co/yhYsNjq/que-puedo-ver-4.png',
  url: 'https://quepuedover.online',
};

export default Seo;
