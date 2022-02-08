import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return '';

  return (
    <>
      <section className="firmm4_footer3 cid-spVZ3ZX922 actvie" id="footer3-n">
        <div className="line"></div>

        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-4 col-lg-5">
              <p className="mbr-text mbr-fonts-style display-4">
                © Copyright 2021 Kit le Nid
              </p>
              <p
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                *Mensualité donnée à titre indicatif uniquement, pour l’achat
                d’un appartement de 190 000 €, sur une base de durée de 25 ans,
                à un taux d’intérêt fixe de 1.4%, incluant un Prêt à Taux Zéro
                de 60 000€ et avec un apport personnel de 5 000 €.
              </p>
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <div className="social-list text-center">
                <div className="soc-item">
                  <a href="https://www.instagram.com/kitlenid/" target="_blank">
                    <span
                      className="
                      mbr-iconfont mbr-iconfont-social
                      socicon-instagram socicon
                    "
                    ></span>
                  </a>
                </div>
                <div className="soc-item">
                  <a
                    href="https://www.facebook.com/Kit-Le-Nid-100190061445515"
                    target="_blank"
                  >
                    <span
                      className="
                      mbr-iconfont mbr-iconfont-social
                      socicon-facebook socicon
                    "
                    ></span>
                  </a>
                </div>
                <div className="mobile-only">
                  <Link href="/cgu">
                    <a className="text-white text-primary">CGU</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 desktop-only">
              <ul className="foot-menu">
                <li className="foot-menu-item mbr-fonts-style display-4">
                  <Link href="/cgu">
                    <a className="text-white text-primary">CGU</a>
                  </Link>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp;
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer>
        {/* <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7NrR47b_NReW4PF6kCDd1vGSUrm9xkzo&libraries=geometry&libraries=places"
        ></script>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js"></script>
        <script src="assets/web/assets/jquery/jquery.min.js"></script>
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
        <script src="assets/theme/js/custom-map.js"></script> */}
      </footer>
    </>
  );
}
