import { useEffect, useState } from "react";
import { Wallet, Chain, Network } from "mintbase";

export const Buy = ({ meta }) => {
  const [nftdata, setNFTData] = useState();

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
      return await result;
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
      setNFTData(
        await (await fetchGraphQL(operations(meta), "checkNFT", {})).json()
      );
    };
    setbuydata();
  }, []);

  const onclkBtn = async () => {
    const { data, error } = await new Wallet().init({
      networkName: Network.testnet,
      chain: Chain.near,
      apiKey: "511a3b51-2ed5-4a27-b165-a27a01eebe0a",
    });

    const { wallet } = data;
    const tokenId = `${nftdata.data.mb_views_active_listings[0].nft_contract_id}:${nftdata.data.mb_views_active_listings[0].token_id}`;
    const price = `${nftdata.data.mb_views_active_listings[0].price.toLocaleString(
      "fullwide",
      { useGrouping: false }
    )}`;

    const marketAddress = nftdata.data.mb_views_active_listings[0].market_id;

    const buyNFT = await wallet.makeOffer(tokenId, price, {
      marketAddress,
    });
  };

  const ele = nftdata ? (
    <section className="section section-buy-nft">
      <div className="collection">
        <div className="collection__left">
          <div className="right">
            <img
              src={nftdata.data.mb_views_active_listings[0].media}
              alt="NFT image"
              className="collection__nft ma--bottom"
            />
            <h2 className="collection__name ma--bottom">
              {nftdata.data.mb_views_active_listings[0].title}
            </h2>
            <p className="collection__description ma--bottom text-base--1">
              {nftdata.data.mb_views_active_listings[0].description}
            </p>
            <span className="collection__price text--h2 ma--bottom">
              {nftdata.data.mb_views_active_listings[0].price.toLocaleString(
                "fullwide",
                { useGrouping: false }
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
  ) : (
    <section className="section section-buy-nft">
      <h1 className="text--h1">Access Denied.</h1>
    </section>
  );

  return ele;
};
