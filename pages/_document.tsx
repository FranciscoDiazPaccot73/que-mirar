/* eslint-disable jsx-a11y/media-has-caption */
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import Image from 'next/image';

export default class Document extends NextDocument {
  render() {
    return (
      <Html data-theme="dark" lang="es" style={{ background: '#1a202c' }}>
        <Head />
        <Image fill alt="bg" className="absolute top-0 left-0" src="/test-bg.webp" />
        <div className="absolute top-0 left-0">
          <video autoPlay loop muted playsInline>
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
