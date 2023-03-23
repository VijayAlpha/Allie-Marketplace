// import { Wallet, Network, Chain } from "mintbase";
import { useWallet } from "@mintbase-js/react";
import { useState, useEffect, useRef } from "react";
import { NFTCard } from "./../../components/NFTCard";

const ListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nftList, setNftList] = useState();
  const { activeAccountId } = useWallet();

  // const dataFetchedRef = useRef(false);

  const loadOwnedNFT = async () => {
    try {
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
      const operations = (accountId, contract_id) => {
        return `
        query ownedNFT {
          mb_views_nft_tokens(
            order_by: {minted_timestamp: desc}
            distinct_on: minted_timestamp
            where: {owner: {_eq: "${accountId}"}, _and: {burned_timestamp: {_is_null: true}}, minter: {_eq: "${accountId}"}, nft_contract_id: {_eq: "${contract_id}"}}
            ) {
            nft_contract_id
            title
            description
            media
            metadata_id
          }
        }
      `;
      };

      const contract_id = process.env.NEXT_PUBLIC_CONTRACT_ID;

      const returnedNftList = await fetchGraphQL(
        operations(activeAccountId, contract_id),
        "ownedNFT",
        {}
      );

      setNftList(returnedNftList.data.mb_views_nft_tokens);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeAccountId) {
      loadOwnedNFT();
    }
  }, [activeAccountId]);

  return (
    <>
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>List NFT</h2>
              </div>
              <ol className="breadcrumb">
                <li className="active">List them for sale</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-section padding-top padding-bottom">
        <div className="container">
          <div className="section-wrapper">
            <div className="explore-wrapper">
              <div className="row justify-content-start gx-4 gy-3">
                {isLoading === true ? (
                  <h1>Loading...</h1>
                ) : nftList.length === 0 ? (
                  <h3>Sorry!... There is No NFT Now.</h3>
                ) : (
                  nftList.map((nftData, id) => {
                    return <NFTCard post={nftData} page={"list"} key={id} />;
                  })
                )}
              </div>
              <div className="load-btn mt-5">
                <a href="#" className="default-btn move-bottom">
                  <span>Load More</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListPage;
