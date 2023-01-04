import Link from "next/link";

export const MainSection = ({ collection }) => {
  return (
    <section
      class="banner-section home-4"
      style={{ backgroundImage: "url(assets/images/banner/bg-4.jpg)" }}
    >
      <div class="container">
        <div class="banner-wrapper">
          <div class="row align-items-center g-5">
            <div class="col-lg-7">
              <div class="banner-content">
                <h1>
                  <span class="theme-color-4"> Create</span>, Collect And
                  <span class="theme-color-4">
                    <br />
                    Sell
                  </span>
                  Digital Items.
                </h1>
                <p>
                  Digital Marketplace For Crypto Collectibles And Non-Fungible
                  Tokens. Buy, Sell, And Discover Exclusive Digital Assets.
                </p>
                <div class="banner-btns d-flex flex-wrap">
                  <a
                    data-blast="bgColor"
                    href="explore.html"
                    class="default-btn move-top"
                  >
                    <span>Explore</span>
                  </a>
                  <a href="signin.html" class="default-btn move-right">
                    <span>Create</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="nft-slider-wrapper">
                <div class="swiper banner-item-slider-2">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <div class="nft-item home-4">
                        <div class="nft-inner">
                          {/* <!-- nft top part --> */}
                          <div class="nft-item-top d-flex justify-content-between align-items-center">
                            <div class="author-part">
                              <ul class="author-list d-flex">
                                <li class="single-author d-flex align-items-center">
                                  <a href="author.html" class="veryfied">
                                    <img
                                      loading="lazy"
                                      src="assets/images/seller/author.jpg"
                                      alt="author-img"
                                    />
                                  </a>
                                  <h6>
                                    <a href="author.html">Aliie eve knox</a>
                                  </h6>
                                </li>
                              </ul>
                            </div>
                            <div class="more-part">
                              <div class="dropstart">
                                <a
                                  class="dropdown-toggle"
                                  href="#"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  data-bs-offset="25,0"
                                >
                                  <i class="icofont-flikr"></i>
                                </a>

                                <ul class="dropdown-menu">
                                  <li>
                                    <a class="dropdown-item" href="#">
                                      <span>
                                        <i class="icofont-warning"></i>
                                      </span>
                                      Report
                                    </a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#">
                                      <span>
                                        <i class="icofont-reply"></i>
                                      </span>
                                      Share
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          {/* <!-- nft-bottom part --> */}
                          <div class="nft-item-bottom">
                            <div class="nft-thumb">
                              <img
                                loading="lazy"
                                src="https://i.seadn.io/gae/Ib421ZfJUEpn0B0QSbwUEw1MhEQtzyUVb1mQOKcXS7Mh8cuR5w3pu9X7LNDiS7fCylBWY48Kt91ew9D3xDxwXeeDe7WPG_zFef-xPA?auto=format&w=1000"
                                alt="nft-img"
                              />

                              {/* <!-- nft countdwon --> */}
                              {/* <!-- <ul class="nft-countdown count-down" data-date="July 05, 2022 21:14:01">
                                                                                                                <li>
                                                                                                                    <span class="days">34</span><span class="count-txt">D</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <span class="hours">09</span><span class="count-txt">H</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <span class="minutes">32</span><span class="count-txt">M</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <span class="seconds">32</span><span class="count-txt">S</span>
                                                                                                                </li>
                                                                                                            </ul> --> */}
                            </div>
                            <div class="nft-content">
                              <h4>
                                <a href="item-details.html">Black Cat </a>
                              </h4>
                              <div class="price-like d-flex justify-content-between align-items-center">
                                <p class="nft-price">
                                  Price:
                                  <span class="yellow-color">34 MEAR</span>
                                </p>
                                {/* <a href="#" class="nft-like">
                                  <i class="icofont-heart"></i> 230
                                </a> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
