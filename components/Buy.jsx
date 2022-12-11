/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element
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
      apiKey: "511a3b51-2ed5-4a27-b165-a27a01eebe0a",
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
      <section className="section section-buy-nft">
        <h1 className="text--h1">
          Buy This NFT To Unlock This Collection
        </h1>
      </section>
      <section className="section section-buy-nft">
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
      </section>
    </>
  ) : (
    <section className="section section-buy-nft">
      <h1 className="text--h1">
        Sorry! This NFT is Sold Out. <br />
        Please Check Other Collections.
      </h1>
    </section>
  );

  return ele;
};
