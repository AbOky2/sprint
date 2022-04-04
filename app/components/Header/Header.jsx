import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Btn, Icon } from 'components';


export default function Header() {
  return (
    <>
      <Head>
        <title>ok</title>
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
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
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
        {/* <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7NrR47b_NReW4PF6kCDd1vGSUrm9xkzo&libraries=geometry&libraries=places"
        ></script> */}
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js"></script>
        {/* <script src="assets/web/assets/jquery/jquery.min.js"></script> */}
        <script src="assets/popper/popper.min.js"></script>
        <script src="assets/tether/tether.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
        ></script>
        <script src="assets/smoothscroll/smooth-scroll.js"></script>
        <script src="assets/dropdown/js/nav-dropdown.js"></script>
        <script src="assets/dropdown/js/navbar-dropdown.js"></script>
        <script src="assets/touchswipe/jquery.touch-swipe.min.js"></script>
        <script src="assets/theme/js/script.js"></script>
        <script src="assets/theme/js/custom-map.js"></script>
      </Head>
      <div id="landing-loader">loading...</div>
      <Icon
              type="logoNew"
              noColor
              size='extra'
              />

    </>
  );
}
