import Script from "next/script";
import { useEffect } from "react";
import jQuery from "jquery";

export const Footer = () => {
  useEffect(() => {
    window.jQuery = jQuery;
  });

  return (
    <footer className="footer-section style-4">
      <div
        className="footer-top"
        style={{
          backgroundImage: "url(/assets/images/footer/bg-4.jpg)",
        }}
      >
        <div className="footer-newsletter">
          <div className="container">
            <div className="row g-4 align-items-center justify-content-center">
              <div className="col-lg-6">
                <div className="newsletter-part">
                  <div className="ft-header">
                    <h4>Get The Latest Rarible Updates</h4>
                  </div>
                  <form action="#">
                    <input type="email" placeholder="Your Mail Address" />
                    <button type="submit" data-blast="bgColor">
                      Subscribe now
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="social-part ps-lg-5">
                  <div className="ft-header">
                    <h4>Join the Community</h4>
                  </div>
                  <ul className="social-list d-flex flex-wrap align-items-center mb-0">
                    <li className="social-link">
                      <a href="#" data-blast="bgColor">
                        <i className="icofont-twitter"></i>
                      </a>
                    </li>
                    <li className="social-link">
                      <a href="#" data-blast="bgColor">
                        <i className="icofont-twitch"></i>
                      </a>
                    </li>
                    <li className="social-link">
                      <a href="#" data-blast="bgColor">
                        <i className="icofont-reddit"></i>
                      </a>
                    </li>
                    <li className="social-link">
                      <a href="#" data-blast="bgColor">
                        <i className="icofont-instagram"></i>
                      </a>
                    </li>
                    <li className="social-link">
                      <a href="#" data-blast="bgColor">
                        <i className="icofont-dribble"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-links padding-top padding-bottom">
          <div className="container">
            <div className="row g-5 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5">
              <div className="col">
                <div className="footer-link-item">
                  <h5>About</h5>
                  <ul className="footer-link-list">
                    <li>
                      <a href="#" className="footer-link">
                        Explore
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        How it works
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Become a partner
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-link-item">
                  <h5>NFT Marketplace</h5>
                  <ul className="footer-link-list">
                    <li>
                      <a href="#" className="footer-link">
                        Sell your assets
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Privacy/Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Your purchases
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-link-item">
                  <h5>Company</h5>
                  <ul className="footer-link-list">
                    <li>
                      <a href="#" className="footer-link">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Mission & Team
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Our Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Services
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-link-item">
                  <h5>NFT Marketplace</h5>
                  <ul className="footer-link-list">
                    <li>
                      <a href="#" className="footer-link">
                        Sell your assets
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Privacy/Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Your purchases
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-link-item">
                  <h5>Comunity</h5>
                  <ul className="footer-link-list">
                    <li>
                      <a href="#" className="footer-link">
                        NFT Token
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Discusion
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Voting
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Suggest Feature
                      </a>
                    </li>
                    <li>
                      <a href="#" className="footer-link">
                        Language
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* 
      <Script src="./assets/js/bootstrap.bundle.min.js" async></Script>
      <Script src="./assets/js/waypoints.min.js" async></Script>
      <Script src="./assets/js/lightcase.js" async></Script>
      <Script src="./assets/js/swiper-bundle.min.js" async></Script>
      <Script src="./assets/js/countdown.min.js" async></Script>
      <Script src="./assets/js/jquery.counterup.min.js" async></Script>
      <Script src="./assets/js/wow.min.js" async></Script>
      <Script src="./assets/js/isotope.pkgd.min.js" async></Script>
      <Script src="./assets/js/functions.js" async></Script> */}
    </footer>
  );
};
