import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()

    return (
      <html>
        <Head>
          <title>Meus Investimentos</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="/static/css/nprogress.css" rel="stylesheet" />
          <link href="/static/css/style.css" rel="stylesheet" />
          {styleTags}
        </Head>
        <body>
          <div className="container-fluid main-content">
            {main}
            <NextScript />
          </div>
        </body>
      </html>
    )
  }
}
