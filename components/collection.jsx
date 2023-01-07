/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export const Collection = ({ post }) => {
  return (
    <Link
      href={`/collection/${post.metadata_id}`}
      className="col-xl-3 col-lg-4 col-sm-6"
    >
      <div className="nft-item home-4">
        <div className="nft-inner">
          {/* <!-- nft top part --> */}
          <div className="nft-item-top d-flex justify-content-between align-items-center">
            <div className="author-part">
              <ul className="author-list d-flex">
                <li className="single-author d-flex align-items-center">
                  <Link href="author.html" className="veryfied">
                    <img
                      loading="lazy"
                      src="/assets/images/seller/author.jpg"
                      alt="author-img"
                    />
                  </Link>
                  <h6>
                    <a href="author.html">Allie eve knox</a>
                  </h6>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- nft-bottom part --> */}
          <div className="nft-item-bottom">
            <div className="nft-thumb">
              <img loading="lazy" src={post.nftImage} alt="nft-img" style={{width: "270px" , height: "260px"}}/>
            </div>
            <div className="nft-content">
              <h4>
                <Link href="item-details.html">{post.name}</Link>
              </h4>
              <div className="price-like d-flex justify-content-between align-items-center">
                <p className="nft-price">
                  Price:{" "}
                  <span className="yellow-color">
                    {Math.round(
                      post.price.toLocaleString("fullwide", {
                        useGrouping: false,
                      }) *
                        10 ** -24
                    )}{" "}
                    NEAR
                  </span>
                </p>
                {/* <a href="#" className="nft-like">
                  <i className="icofont-heart"></i> 230
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
