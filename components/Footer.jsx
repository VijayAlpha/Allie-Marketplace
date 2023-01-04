import Script from "next/script";

export const Footer = () => {
  return (
    <footer class="footer-section style-4">
      <div
        class="footer-top"
        style={{
          backgroundImage: "url(assets/images/footer/bg-4.jpg)",
        }}
      >
        <div class="footer-newsletter">
          <div class="container">
            <div class="row g-4 align-items-center justify-content-center">
              <div class="col-lg-6">
                <div class="newsletter-part">
                  <div class="ft-header">
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
              <div class="col-lg-6">
                <div class="social-part ps-lg-5">
                  <div class="ft-header">
                    <h4>Join the Community</h4>
                  </div>
                  <ul class="social-list d-flex flex-wrap align-items-center mb-0">
                    <li class="social-link">
                      <a href="#" data-blast="bgColor">
                        <i class="icofont-twitter"></i>
                      </a>
                    </li>
                    <li class="social-link">
                      <a href="#" data-blast="bgColor">
                        <i class="icofont-twitch"></i>
                      </a>
                    </li>
                    <li class="social-link">
                      <a href="#" data-blast="bgColor">
                        <i class="icofont-reddit"></i>
                      </a>
                    </li>
                    <li class="social-link">
                      <a href="#" data-blast="bgColor">
                        <i class="icofont-instagram"></i>
                      </a>
                    </li>
                    <li class="social-link">
                      <a href="#" data-blast="bgColor">
                        <i class="icofont-dribble"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-links padding-top padding-bottom">
          <div class="container">
            <div class="row g-5 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5">
              <div class="col">
                <div class="footer-link-item">
                  <h5>About</h5>
                  <ul class="footer-link-list">
                    <li>
                      <a href="#" class="footer-link">
                        Explore
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        How it works
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Become a partner
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="footer-link-item">
                  <h5>NFT Marketplace</h5>
                  <ul class="footer-link-list">
                    <li>
                      <a href="#" class="footer-link">
                        Sell your assets
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Privacy/Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Your purchases
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="footer-link-item">
                  <h5>Company</h5>
                  <ul class="footer-link-list">
                    <li>
                      <a href="#" class="footer-link">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Mission & Team
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Our Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Services
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="footer-link-item">
                  <h5>NFT Marketplace</h5>
                  <ul class="footer-link-list">
                    <li>
                      <a href="#" class="footer-link">
                        Sell your assets
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Privacy/Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Your purchases
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="footer-link-item">
                  <h5>Comunity</h5>
                  <ul class="footer-link-list">
                    <li>
                      <a href="#" class="footer-link">
                        NFT Token
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Discusion
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Voting
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
                        Suggest Feature
                      </a>
                    </li>
                    <li>
                      <a href="#" class="footer-link">
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
    </footer>
  );
};
