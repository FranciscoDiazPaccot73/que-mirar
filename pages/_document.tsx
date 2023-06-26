/* eslint-disable jsx-a11y/media-has-caption */
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html data-theme="dark" lang="es" style={{ background: '#1a202c' }}>
        <Head />
        <div className="absolute top-0 left-0">
          <video autoPlay loop muted src="/test-bg.mp4" />
        </div>
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
