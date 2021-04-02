import { DidomiSDK } from '@didomi/react';

const didomiConfig = {
  app: {
    vendors: {
      iab: {
        all: true,
      },
    },
  },
  notice: {
    position: 'bottom',
  },
};
export default () => (
  <DidomiSDK
    config={didomiConfig}
    apiKey="923bcadb-dc92-44c8-b6eb-1dc9fe53085d"
    iabVersion={2}
    sdkPath="https://sdk.privacy-center.org/"
    gdprAppliesGlobally
  />
);
