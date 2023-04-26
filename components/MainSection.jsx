import Link from "next/link";
import Image from "next/image";
import { utils } from "near-api-js";

export const MainSection = ({ collection }) => {
  const priceYocto = collection?.price.toLocaleString().replace(/,/g, "");
  const priceNear = utils.format.formatNearAmount(priceYocto, 2);
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
                  <Link
                    data-blast="bgColor"
                    href="/collection"
                    className="default-btn move-top"
                  >
                    <span>Explore</span>
                  </Link>
                  <Link href="/tipme" className="default-btn move-right">
                    <span>Tip Me</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              {collection ? (
                <div className="nft-slider-wrapper">
                  <div className="swiper banner-item-slider-2">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="nft-item home-4">
                          <div
                            className="nft-inner"
                            onClick={() => {
                              let herfLink = `/collection/${collection?.metadata_id}`;
                              window.open(herfLink, "_self");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                              <div className="author-part">
                                <ul className="author-list d-flex">
                                  <li className="single-author d-flex align-items-center">
                                    <a href="#" className="veryfied">
                                      <Image
                                        loading="lazy"
                                        src="/assets/images/seller/author.jpg"
                                        alt="author-img"
                                        width={100}
                                        height={100}
                                      />
                                    </a>
                                    <h6>
                                      <a href="#">Aliie eve knox</a>
                                    </h6>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="nft-item-bottom">
                              <div
                                className="nft-thumb"
                                style={{ width: "100%", height: "360px" }}
                              >
                                <Image
                                  src={
                                    collection?.nftImage
                                      ? collection?.nftImage
                                      : "/no-image.png"
                                  }
                                  style={{
                                    objectFit: "cover",
                                    objectPosition: "top",
                                  }}
                                  alt="nft-img"
                                  fill
                                />
                              </div>
                              <div className="nft-content">
                                <h4>
                                  <Link
                                    href={`/collection/${collection?.metadata_id}`}
                                  >
                                    {collection?.name}
                                  </Link>
                                </h4>
                                <div className="price-like d-flex justify-content-between align-items-center">
                                  <p className="nft-price">
                                    Price:
                                    <span className="yellow-color">
                                      {priceNear}N
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
