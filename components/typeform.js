import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactTypeformEmbed = dynamic(() => import('react-typeform-embed/lib/ReactTypeformEmbed'), {
  ssr: false,
});

export default () => (
  <div>
    <ReactTypeformEmbed url="https://form.typeform.com/to/HxbVGDrG?typeform-medium=embed-snippet" />
  </div>
);
