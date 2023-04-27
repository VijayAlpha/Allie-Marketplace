import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { utils } from "near-api-js";
import fetchGraphQL from "../packages/FetchGraphQL";

export const CollectionCard = ({ post }) => {
  const [nftData, setNFTData] = useState();

  const priceYocto = nftData?.price.toLocaleString().replace(/,/g, "");
  const priceNear = utils.format.formatNearAmount(priceYocto, 2);

  const TOKEN_QUERY = (metadata_id_) => {
    return `
          query checkNFT {
            mb_views_active_listings(
              where: {metadata_id: {_eq: "${metadata_id_}"}}
              limit: 1
              order_by: {price: asc}
            ) {
              price
            }
          }
        `;
  };

  const fetchTokenData = async () => {
    const tokenData = await fetchGraphQL(
      TOKEN_QUERY(post.metadata_id),
      "checkNFT",
      {}
    );
    setNFTData(tokenData?.data.mb_views_active_listings[0]);
  };

  useEffect(() => {
    fetchTokenData();
  });

  return (
    <Link
      href={`/collection/${post.metadata_id}`}
      className="col-xl-4 col-lg-4 col-sm-6"
    >
      <div className="nft-item home-4">
        <div className="nft-inner">
          {/* <!-- nft top part --> */}
          <div className="nft-item-top d-flex justify-content-between align-items-center">
            <div className="author-part">
              <ul className="author-list d-flex">
                <li className="single-author d-flex align-items-center">
                  <span href="#" className="veryfied">
                    <Image
                      loading="lazy"
                      src="/assets/images/seller/author.jpg"
                      alt="author-img"
                      width={100}
                      height={100}
                    />
                  </span>
                  <h6>
                    <span href="#">Allie eve knox </span>
                  </h6>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- nft-bottom part --> */}
          <div className="nft-item-bottom">
            <div
              className="nft-thumb"
              style={{ width: "100%", height: "300px" }}
            >
              <Image
                loading="lazy"
                src={post.nftImage}
                style={{ objectFit: "cover", objectPosition: "top" }}
                alt="nft-img"
                fill
              />
            </div>
            <div className="nft-content">
              <h4>{post.name}</h4>
              <div className="price-like d-flex justify-content-between align-items-center">
                <p className="nft-price">
                  Price: <span className="yellow-color">{priceNear}N</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
