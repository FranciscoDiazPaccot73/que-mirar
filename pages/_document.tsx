/* eslint-disable jsx-a11y/media-has-caption */
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html data-theme="dark" lang="es" style={{ background: '#1a202c' }}>
        <Head>
          <link as="image" href="/test-bg.webp" rel="preload" />
        </Head>
        <div className="absolute top-0 left-0">
          <video autoPlay loop muted playsInline poster="/test-bg.webp">
            <source src="/test-bg.webm" type="video/webm" />
            <source src="/test-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
