import { Head } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="google-site-verification" content="your-verification-code-here" />
        {/* Existing meta tags */}
      </Head>
      <body>
        {/* Your content goes here */}
      </body>
    </Html>
  );
}