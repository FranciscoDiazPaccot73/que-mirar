import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html data-theme="dark" lang="es" style={{ background: '#1a202c' }}>
        <Head />
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
