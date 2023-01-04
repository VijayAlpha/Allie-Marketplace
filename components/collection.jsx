/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element
import Link from "next/link";

export const Collection = ({ post }) => {
  return (
    <Link href={`/collection/${post.metadata_id}`}>
      <div class="col-xl-3 col-lg-4 col-sm-6">
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
                      <a href="author.html">Allie eve knox</a>
                    </h6>
                  </li>
                </ul>
              </div>
              {/* <div class="more-part">
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
              </div> */}
            </div>
            {/* <!-- nft-bottom part --> */}
            <div class="nft-item-bottom">
              <div class="nft-thumb">
                <img loading="lazy" src={post.nftImage} alt="nft-img" />
              </div>
              <div class="nft-content">
                <h4>
                  <a href="item-details.html">{post.name}</a>
                </h4>
                <div class="price-like d-flex justify-content-between align-items-center">
                  <p class="nft-price">
                    Price:{" "}
                    <span class="yellow-color">
                      {Math.round(
                        post.price.toLocaleString("fullwide", {
                          useGrouping: false,
                        }) *
                          10 ** -24
                      )}{" "}
                      NEAR
                    </span>
                  </p>
                  <a href="#" class="nft-like">
                    <i class="icofont-heart"></i> 230
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
