/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
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
          <meta name="theme-color" content="#1976D2" />
          <link
            rel="shortcut icon"
            href="https://storage.googleapis.com/builderbook/favicon32.png"
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
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <style>
            {`
              html {
                font-size: 10px;
              }
              body {
                background-color: #F7F8FA!important;
              }
              .main-container {
                max-width: 1280px;
                margin: auto;
              }
              a, a:focus {
                font-weight: 400;
                color: #1565C0;
                text-decoration: none;
                outline: none
              }
              a:hover, button:hover {
                opacity: 0.75;
                cursor: pointer
              }
              blockquote {
                padding: 0 1em;
                color: #555;
                border-left: 0.25em solid #dfe2e5;
              }
              pre {
                display:block;
                overflow-x:auto;
                padding:0.5em;
                background:#FFF;
                color: #000;
                border: 1px solid #ddd;
                font-size: 14px;
              }
              code {
                font-size: 14px;
                background: #FFF;
              }
              .relative {
                position: relative;
              }
              .no-margin {
                margin: auto !important;
              }
              div.fitwidth {
                width: fit-content
              }
              .fullwidth {
                width: 100%;
              }
              .fullheight {
                height: 100%;
              }
              .text-left {
                text-align: left;
              }
              .text-right {
                text-align: right;
              }
              .text-center {
                text-align: center;
              }
              .inline-block {
                display: inline-block;
              }
              .student-content-wrapper {
                padding: 0 3rem;
              }
              .pointer {
                cursor: pointer;
              }
              // to replace with matterial style
              .upload {
                position: relative;
                display: inline-block;
              }

              .upload input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
              }
              .upload img {
                max-height: 200px;
                display: inline-block;
              }

              .partner-filter {
                margin: 0 5px 5px;
                cursor: pointer;
                font-size: 1.3rem;
                padding-top: 3.5rem;
              }
              .partner-filter:hover .icon-container {
                display: block;
              }
              .partner-filter .icon-container {
                position: absolute;
                display: none;
                bottom: 3.5rem;
                width: 100%;
                text-align: center;
                transform: rotate(45deg);
              }
              .partner-filter.active {
                color: #475f7b;
                text-decoration: underline;
              }
              .partner-add p {
                display: inline-block;
              }
              .partner-add .header-icon {
                margin-right: 5px;
              }
              .partner-card-list-container {
                padding: 2rem 1rem;
              }
              .partner-card-list {
                padding: 1rem;
              }
              
              .modal-content-container {
                padding: 4rem 6rem;
              }
              .modal-title {
                font-family: 'Nunito';
                font-style: normal;
                font-weight: bold;
                font-size: 2.6rem;
                line-height: 35px;
                text-align: center;
                margin-bottom: 4rem;
                color: #1a2e6c;
              }
              .modal-action-container {
                margin-top: 4rem;
                border-top: 1px solid #c1cde7;
              }
              .modal-action-container > div:first-of-type {
                margin-right: 1rem;
              }
              .modal-action-container > div:last-of-type {
                margin-left: 1rem;
              }
              
              div.header {
                padding-top: 15px;
                padding-bottom: 15px;
              }
              
              .admin-container {
                min-height: 100vh;
              }
              .student-container.admin-container #sidebar {
                position: fixed;
                max-width: 215px;
              }
              .spacing {
                padding: 0 24px;
              }
              .admin-container #sidebar {
                padding-top: 5rem;
              }
              .admin-container #sidebar h2 {
                margin-bottom: 0;
              }
              .admin-container #sidebar h3 {
                margin-top: 0;
                margin-bottom: 5rem;
              }
              .admin-container #sidebar ul li {
                list-style: none;
              }
              .admin-container #sidebar ul ul {
                padding: 0;
              }
              .admin-container #sidebar ul ul li {
                cursor: pointer;
              }
              .admin-container #sidebar ul span {
                display: block;
              }
              .custom-upload-conatainer > span {
                marginBottom: 1rem;
              }
              .css-1okebmr-indicatorSeparator {
                display: none;
              }
              .Toastify__toast {
                border-radius: 15px!important;
              }
              .slick-center {
                padding: 0 10px;
              }
            `}
          </style>
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
        </Head>
        <body>
          <Main />
          {/* Added next.config.js
          {/* eslint-disable-next-line react/no-danger */}
          {/* <script dangerouslySetInnerHTML={{ __html: `__ENV__ = ${htmlescape(env)}` }} /> */}
          <NextScript />
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
