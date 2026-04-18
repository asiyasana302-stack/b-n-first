import { createRootRoute } from 'somewhere';

export const rootRoute = createRootRoute({
  ...
  head: {
    ...
    meta: [
      { name: 'google-site-verification', content: 'N--TqnvNFVMi0_7dQCdhGSiCzMT1gQLAKSoQfLkOo3o' },
    ],
  },
});

// In the appropriate HTML file or component for the head element
export const HtmlHead = () => (
  <head>
    <meta name="google-site-verification" content="N--TqnvNFVMi0_7dQCdhGSiCzMT1gQLAKSoQfLkOo3o" />
  </head>
);