import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8dhzyIVNBptL91PB1oCY6Y-4R9oVodKI&libraries=places"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
