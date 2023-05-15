/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import { execute, buy } from "@mintbase-js/sdk";
import { utils } from "near-api-js";
import fetchGraphQL from "../packages/FetchGraphQL";

export const Buy = ({ meta }) => {
  const [nftData, setNFTData] = useState();
  const { selector } = useWallet();

  const priceYocto = nftData?.price.toLocaleString().replace(/,/g, "");
  const priceNear = utils.format.formatNearAmount(priceYocto, 2);

  const handleBuyToken = async (nftContractId, tokenId, price) => {
    const wallet = await selector.wallet();

    await execute(
      { wallet },
      buy({
        tokenId,
        price,
        contractAddress: nftContractId,
        affiliateAccount: process.env.NEXT_PUBLIC_REFERRAL_ID,
      })
    );
  };

  const TOKEN_QUERY = (metadata_id_) => {
    return `
          query checkNFT {
            mb_views_active_listings(
              where: {metadata_id: {_eq: "${metadata_id_}"}}
              limit: 1
              order_by: {price: asc}
            ) {
              token_id
              nft_contract_id
              title
              price
              description
              media
              market_id
            }
          }
        `;
  };

  const fetchTokenData = async () => {
    const tokenData = await fetchGraphQL(TOKEN_QUERY(meta), "checkNFT", {});
    setNFTData(tokenData?.data.mb_views_active_listings[0]);
  };

  useEffect(() => {
    fetchTokenData();
  });

  const NoTokens = (
    <section className="page-header-section style-1 vh-100">
      <div className="container">
        <div className="page-header-content">
          <div className="page-header-inner">
            <div className="page-title">
              <h2>NFTs are sold.</h2>
            </div>
            <div className="page-title">
              <Link href="/collection">Check other collections here.</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const TokenBuy = nftData ? (
    <>
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2> NFT Details</h2>
              </div>
              <ol className="breadcrumb">
                <li>Buy this NFT to unlock the collection</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <div className="item-details-section padding-top padding-bottom">
        <div className="container">
          <div className="item-details-wrapper">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="item-desc-part">
                  <div className="item-desc-inner">
                    <div className="item-desc-thumb">
                      <img src={nftData.media} alt="item-img" />
                    </div>
                    <div className="item-desc-content">
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="details-tab tab-pane fade show active"
                          id="nav-details"
                          role="tabpanel"
                          aria-labelledby="nav-details-tab"
                        >
                          <p>{nftData.description}</p>
                          <ul className="other-info-list">
                            <li className="item-other-info">
                              <div className="item-info-title">
                                <h6>Contact Address</h6>
                              </div>
                              <div className="item-info-details">
                                <div id="cryptoCode" className="crypto-page">
                                  <input
                                    id="cryptoLink"
                                    value={nftData.nft_contract_id}
                                    readOnly
                                  />
                                  <div
                                    id="cryptoCopy"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Copy Address"
                                  >
                                    <span className="copy-icon">
                                      <i
                                        className="icofont-ui-copy"
                                        aria-hidden="true"
                                        data-copytarget="#cryptoLink"
                                      ></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="item-other-info">
                              <div className="item-info-title">
                                <h6>Token ID</h6>
                              </div>
                              <div className="item-info-details">
                                <p>{nftData.token_id}</p>
                              </div>
                            </li>
                            <li className="item-other-info">
                              <div className="item-info-title">
                                <h6>Market</h6>
                              </div>
                              <div className="item-info-details">
                                <p>{nftData.market_id}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="item-buy-part">
                  <div className="nft-item-title">
                    <h3>Name: {nftData.title}</h3>
                    {/* <div className="share-btn">
                      <div className=" dropstart">
                        <a
                          className=" dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          data-bs-offset="25,0"
                        >
                          <i className="icofont-share-alt"></i>
                        </a>

                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <span>
                                <i className="icofont-twitter"></i>
                              </span>{" "}
                              Twitter{" "}
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <span>
                                <i className="icofont-telegram"></i>
                              </span>{" "}
                              Telegram
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <span>
                                <i className="icofont-envelope"></i>
                              </span>{" "}
                              Email
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>

                  <div className="item-price">
                    <h4>Price :</h4>
                    <p>
                      <span>
                        <i className="icofont-coins"></i>
                        {priceNear}N
                      </span>
                    </p>
                  </div>
                  <div
                    className="buying-btns d-flex flex-wrap pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuyToken(
                        nftData.nft_contract_id,
                        nftData.token_id,
                        priceYocto
                      );
                    }}
                  >
                    <div className="default-btn move-right">
                      <span>Buy Now</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <section className="page-header-section style-1 vh-100">
      <div className="container">
        <div className="page-header-content">
          <div className="page-header-inner">
            <div className="page-title">
              <h2> Sorry! This NFT is Sold Out.</h2>
            </div>
            <ol className="breadcrumb">
              <li>
                <Link href="/">Please Check Other Collections.</Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );

  return nftData ? TokenBuy : NoTokens;
};
