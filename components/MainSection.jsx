import Link from "next/link";

export const MainSection = ({ collection }) => {
  return (
    <section
      className="banner-section home-4"
      style={{ backgroundImage: "url(assets/images/banner/bg-4.jpg)" }}
    >
      <div className="container">
        <div className="banner-wrapper">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="banner-content">
                <h1>
                  <span className="theme-color-4"> Buy</span>, Unlock And
                  <span className="theme-color-4">
                    <br />
                    Enjoy.
                  </span>
                  The NSFW Content
                </h1>
                <p>
                  Digital Marketplace For NSFW Content And Non-Fungible Tokens.
                  Buy, Sell, And Discover Exclusive Digital Assets.
                </p>
                <div className="banner-btns d-flex flex-wrap">
                  <a
                    data-blast="bgColor"
                    href="explore.html"
                    className="default-btn move-top"
                  >
                    <span>Explore</span>
                  </a>
                  <a href="signin.html" className="default-btn move-right">
                    <span>Create</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="nft-slider-wrapper">
                <div className="swiper banner-item-slider-2">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="nft-item home-4">
                        <div className="nft-inner">
                          {/* <!-- nft top part --> */}
                          <div className="nft-item-top d-flex justify-content-between align-items-center">
                            <div className="author-part">
                              <ul className="author-list d-flex">
                                <li className="single-author d-flex align-items-center">
                                  <a href="author.html" className="veryfied">
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
                            <div className="more-part">
                              <div className="dropstart">
                                <a
                                  className="dropdown-toggle"
                                  href="#"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  data-bs-offset="25,0"
                                >
                                  <i className="icofont-flikr"></i>
                                </a>

                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <span>
                                        <i className="icofont-warning"></i>
                                      </span>
                                      Report
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <span>
                                        <i className="icofont-reply"></i>
                                      </span>
                                      Share
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          {/* <!-- nft-bottom part --> */}
                          <div className="nft-item-bottom">
                            <div className="nft-thumb">
                              <img
                                loading="lazy"
                                src="https://i.seadn.io/gae/Ib421ZfJUEpn0B0QSbwUEw1MhEQtzyUVb1mQOKcXS7Mh8cuR5w3pu9X7LNDiS7fCylBWY48Kt91ew9D3xDxwXeeDe7WPG_zFef-xPA?auto=format&w=1000"
                                alt="nft-img"
                              />

                              {/* <!-- nft countdwon --> */}
                              {/* <!-- <ul className="nft-countdown count-down" data-date="July 05, 2022 21:14:01">
                                                                                                                <li>
                                                                                                                    <span className="days">34</span><span className="count-txt">D</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <span className="hours">09</span><span className="count-txt">H</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <span className="minutes">32</span><span className="count-txt">M</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <span className="seconds">32</span><span className="count-txt">S</span>
                                                                                                                </li>
                                                                                                            </ul> --> */}
                            </div>
                            <div className="nft-content">
                              <h4>
                                <a href="item-details.html">Black Cat </a>
                              </h4>
                              <div className="price-like d-flex justify-content-between align-items-center">
                                <p className="nft-price">
                                  Price:
                                  <span className="yellow-color">34 MEAR</span>
                                </p>
                                {/* <a href="#" className="nft-like">
                                  <i className="icofont-heart"></i> 230
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
