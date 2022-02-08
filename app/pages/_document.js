/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import Script from 'next/script';
// import htmlescape from 'htmlescape';

class MyDocument extends Document {
  static getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  };

  render() {
    return (
      <Html lang="en" style={{ height: '100%' }}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />
          <meta name="theme-color" content="#F9FBFF" />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/static/favicon.png"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400:latin"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/nprogress.min.css"
          />
          <link
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/vs.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link href="/static/styles.css" rel="stylesheet" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()`,
            }}
          />
          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7NrR47b_NReW4PF6kCDd1vGSUrm9xkzo&libraries=places"
          />

          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <link
            rel="shortcut icon"
            href="assets/images/icon-128x128.png"
            type="image/x-icon"
          />
          <meta
            name="description"
            content="La première offre d’accompagnement dédiée aux jeunes du groupe Nexity. N’attendez pas d’avoir 30 ans pour devenir propriétaire !"
          />

          <title>Kit le Nid</title>
          <link
            rel="stylesheet"
            href="assets/web/assets/mobirise-icons2/mobirise2.css"
          />
          <link rel="stylesheet" href="assets/web/assets/shared.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700|Nunito"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="stylesheet" href="assets/tether/tether.min.css" />
          <link
            rel="stylesheet"
            href="assets/bootstrap/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="assets/bootstrap/css/bootstrap-grid.min.css"
          />
          <link
            rel="stylesheet"
            href="assets/bootstrap/css/bootstrap-reboot.min.css"
          />
          <link rel="stylesheet" href="assets/dropdown/css/style.css" />
          <link rel="stylesheet" href="assets/socicon/css/styles.css" />
          <link
            rel="preload"
            as="style"
            href="assets/mobirise/css/mbr-additional.css"
          />
          <link
            rel="stylesheet"
            href="assets/mobirise/css/mbr-additional.css"
            type="text/css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
          />

          <link rel="stylesheet" href="styleKL.css" />
        </Head>
        <body>
          <Main />
          {/* Added next.config.js
          {/* eslint-disable-next-line react/no-danger */}
          {/* <script dangerouslySetInnerHTML={{ __html: `__ENV__ = ${htmlescape(env)}` }} /> */}
          <NextScript />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
          <script src="assets/touchswipe/jquery.touch-swipe.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7NrR47b_NReW4PF6kCDd1vGSUrm9xkzo&libraries=geometry&libraries=places"
          ></script>
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
          <script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js"></script>
          <script src="assets/popper/popper.min.js"></script>
          <script src="assets/tether/tether.min.js"></script>
          <script src="assets/bootstrap/js/bootstrap.min.js"></script>
          <script src="assets/smoothscroll/smooth-scroll.js"></script>
          <script src="assets/dropdown/js/nav-dropdown.js"></script>
          <script src="assets/dropdown/js/navbar-dropdown.js"></script>
          <script src="assets/theme/js/script.js"></script>
          <script src="assets/theme/js/custom-map.js"></script>
        </body>
      </Html>
    );
  }
}

// MyDocument.getInitialProps = async (ctx) => {
//   // Resolution order
//   //
//   // On the server:
//   // 1. app.getInitialProps
//   // 2. page.getInitialProps
//   // 3. document.getInitialProps
//   // 4. app.render
//   // 5. page.render
//   // 6. document.render
//   //
//   // On the server with error:
//   // 1. document.getInitialProps
//   // 2. app.render
//   // 3. page.render
//   // 4. document.render
//   //
//   // On the client
//   // 1. app.getInitialProps
//   // 2. page.getInitialProps
//   // 3. app.render
//   // 4. page.render

//   // Render app and page and get the context of the page with collected side effects.
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: (
//       <React.Fragment>
//         {initialProps.styles}
//         {sheets.getStyleElement()}
//       </React.Fragment>
//     ),
//   };
// };

export default MyDocument;
