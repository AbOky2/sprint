import { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
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
import CookieConsent from 'lib/cookieConsent';
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
      <CookieConsent />
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
