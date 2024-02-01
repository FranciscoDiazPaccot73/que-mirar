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
      <link href="/favicon.ico" rel="icon" type="image/x-icon" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"/>
      <link href="/site.webmanifest" rel="manifest"/>
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
