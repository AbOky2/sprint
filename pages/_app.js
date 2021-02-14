import react, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App from 'next/app';
import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from '../lib/theme';
import { wrapper } from '../redux';
import Notifier from '../components/Notifier';
import Header from '../components/Header';

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

// class MyApp extends App {
//   state = {
//     store: {},
//   };

//   componentDidMount() {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector('#jss-server-side');
//     if (jssStyles && jssStyles.parentNode) {
//       jssStyles.parentNode.removeChild(jssStyles);
//     }
//     const store = useStore((state) => state);
//     console.log(store);
//     this.setState({ store });
//   }

//   render() {
//     const { Component, pageProps } = this.props;
//     const { store } = this.state;

//     return (
//       <ThemeProvider theme={theme}>
//         {/* ThemeProvider makes the theme available down the React tree thanks to React context. */}
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <Head>
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         </Head>
//         <CssBaseline />
//         <div className="main-container">
//           {/* <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}> */}
//           {!pageProps.user?.isAdmin ? null : <Header {...pageProps} />}
//           <Component {...pageProps} />
//           {/* </PersistGate> */}
//         </div>
//         <Notifier />
//       </ThemeProvider>
//     );
//   }
// }
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
      <CssBaseline />
      <div className="main-container">
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          {!pageProps.user?.isAdmin ? null : <Header {...pageProps} />}
          <Component {...pageProps} />
        </PersistGate>
      </div>
      <Notifier />
    </ThemeProvider>
  );
};

MyApp.propTypes = propTypes;

export default wrapper.withRedux(MyApp);
