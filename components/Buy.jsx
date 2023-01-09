/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useEffect, useState } from "react";
import { Wallet, Chain, Network } from "mintbase";

export const Buy = ({ meta }) => {
  const [nftData, setNFTData] = useState();

  useEffect(() => {
    async function fetchGraphQL(operationsDoc, operationName, variables) {
      const result = await fetch(
        "https://interop-testnet.hasura.app/v1/graphql",
        {
          method: "POST",
          body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
          }),
        }
      );
      return result.json();
    }
    const operations = (metadata_id_) => {
      return `
            query checkNFT {
              mb_views_active_listings(
                where: {metadata_id: {_eq: "${metadata_id_}"}}
                limit: 1
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

    const setbuydata = async () => {
      const returnedNftData = await fetchGraphQL(
        operations(meta),
        "checkNFT",
        {}
      );
      setNFTData(returnedNftData.data.mb_views_active_listings[0]);
    };
    setbuydata();
  });

  const onclkBtn = async () => {
    const { data, error } = await new Wallet().init({
      networkName: Network.testnet,
      chain: Chain.near,
      apiKey: process.env.NEXT_PUBLIC_MINTBASE_API,
    });

    const { wallet } = data;
    const tokenId = `${nftData.nft_contract_id}:${nftData.token_id}`;
    const price = `${nftData.price.toLocaleString("fullwide", {
      useGrouping: false,
    })}`;

    const marketAddress = nftData.market_id;

    await wallet.makeOffer(tokenId, price, {
      marketAddress,
    });
  };

  const ele = nftData ? (
    <>
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2> NFT Details</h2>
              </div>
              <ol className="breadcrumb">
                <li>Buy this NFT to unloack the collection</li>
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
                      <img src={nftData.media} alt="item-img"/>
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
                    <div className="share-btn">
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
                    </div>
                  </div>

                  <div className="item-price">
                    <h4>Price</h4>
                    <p>
                      <span>
                        <i className="icofont-coins"></i>
                        {Math.round(
                          nftData.price.toLocaleString("fullwide", {
                            useGrouping: false,
                          }) *
                            10 ** -24
                        )}{" "}
                        NEAR
                      </span>
                    </p>
                  </div>
                  <div
                    className="buying-btns d-flex flex-wrap pointer"
                    onClick={() => onclkBtn()}
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
      {/* <section className="section section-buy-nft">
        <div className="collection">
          <div className="collection__left">
            <div className="right">
              <img
                src={nftData.media}
                alt="NFT image"
                className="collection__nft ma--bottom"
              />
              <h2 className="collection__name ma--bottom">{nftData.title}</h2>
              <p className="collection__description ma--bottom text-base--1">
                {nftData.description}
              </p>
              <span className="collection__price text--h2 ma--bottom">
                {Math.round(
                  nftData.price.toLocaleString("fullwide", {
                    useGrouping: false,
                  }) *
                    10 ** -24
                )}
                <img
                  src="https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=023"
                  alt="NEAR"
                  className="collection__price--img"
                />
              </span>
            </div>
            <div className="left">
              <button
                className="btn collection__btn"
                id="btn-buy-nft"
                onClick={() => onclkBtn()}
              >
                Buy to Unlock
              </button>
            </div>
          </div>
        </div>
      </section> */}
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
                <a href="index.html">Please Check Other Collections.</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );

  return ele;
};
