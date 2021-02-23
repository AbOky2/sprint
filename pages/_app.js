import { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';

import { DidomiSDK } from '@didomi/react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { theme } from '../lib/theme';
import { wrapper } from '../redux';
import Notifier from '../components/Notifier';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', (url) => {
  if (window && process.env.GA_MEASUREMENT_ID) {
    window.gtag('config', process.env.GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }

  NProgress.done();
});

Router.events.on('routeChangeError', () => NProgress.done());

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired, // eslint-disable-line
};

const MyApp = ({ Component, pageProps }) => {
  const store = useStore((state) => state);

  useEffect(() => {
    return () => {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* ThemeProvider makes the theme available down the React tree thanks to React context. */}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* <DidomiSDK
        apiKey="923bcadb-dc92-44c8-b6eb-1dc9fe53085d"
        iabVersion={2}
        sdkPath="https://sdk.privacy-center.org/"
        gdprAppliesGlobally
        onReady={(didomi) => console.log('Didomi SDK is loaded and ready', didomi)}
        onConsentChanged={(cwtToken) => console.log('A consent has been given/withdrawn', cwtToken)}
        onNoticeShown={() => console.log('Didomi Notice Shown')}
        onNoticeHidden={() => console.log('Didomi Notice Hidden')}
      /> */}
      <CssBaseline />
      <div className="main-container">
        <PersistGate persistor={store.__persistor}>
          {!pageProps.user?.isAdmin ? null : <Header {...pageProps} />}
          <Component {...pageProps} />
        </PersistGate>
      </div>
      <Notifier />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </ThemeProvider>
  );
};

MyApp.propTypes = propTypes;

export default wrapper.withRedux(MyApp);
