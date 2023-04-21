import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

import loader from '../loader';

export default class Document extends NextDocument {
  render() {
    return (
      <Html data-theme="dark" lang='es' style={{ background: "#1a202c" }} >
        <Head />
        <head>
          <style>
            {loader}
          </style>
        </head>
        <body id="body" className="scroll-disabled">
          <div id="spinner">
            <div className='spinner' />
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
