// import { Wallet, Network, Chain } from "mintbase";
import { useWallet } from "@mintbase-js/react";
import { useState, useEffect, useRef } from "react";
import fetchGraphQL from "../../packages/FetchGraphQL";
import { NFTCard } from "./../../components/NFTCard";

const ListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nftList, setNftList] = useState();
  const { activeAccountId } = useWallet();

  // const dataFetchedRef = useRef(false);

  const loadOwnedNFT = async () => {
    try {
      const contract_id = process.env.NEXT_PUBLIC_CONTRACT_ID;

      const TOKEN_QUERY = (accountId, contract_id) => {
        return `
        query ownedNFT {
          mb_views_nft_tokens(
            distinct_on: reference
            where: {minter: {_eq: "${accountId}"}, nft_contract_id: {_eq: "${contract_id}"}}
          ) {
            nft_contract_id
            title
            description
            media
            metadata_id
            minted_timestamp
          }
        }
        
      `;
      };

      const returnedNftList = await fetchGraphQL(
        TOKEN_QUERY(activeAccountId, contract_id),
        "ownedNFT",
        {}
      );

      //This sorting method is used to sort by newly minted timpstamp
      const sortedArray = returnedNftList.data.mb_views_nft_tokens.sort(
        (a, b) => {
          return (
            Date.parse(b.minted_timestamp) - Date.parse(a.minted_timestamp)
          );
        }
      );
      setNftList(sortedArray);
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

      <section className="explore-section padding-top padding-bottom min-vh-100">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListPage;
