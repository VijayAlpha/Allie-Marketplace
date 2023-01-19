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

      </div>

    </footer>
  );
};
