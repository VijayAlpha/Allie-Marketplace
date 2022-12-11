import { useEffect, useState } from "react";
import { Wallet, Chain, Network, MetadataField } from "mintbase";
import axios from "axios";
import { MintbaseNFT } from "../components/mintBaseNFT";

const CreateCollection = () => {
  const [nftData, setNftData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

      return await result.json();
    }

    let nft_contract_id = "unlockableteststore.mintspace2.testnet";

    const operations = (nft_contract_id) => {
      return `
      query MyQuery {
        mb_views_active_listings(
          where: {nft_contract_id: {_eq: "${nft_contract_id}"}}
          distinct_on: metadata_id
        ) {
          description      
          media
          metadata_id
          price
          title
        }
      }
      
    `;
    };

    async function fetchCheckNFT() {
      const { errors, data } = await fetchGraphQL(
        operations(nft_contract_id),
        "MyQuery",
        {}
      );

      setNftData(data.mb_views_active_listings);
      setIsLoading(false);
    }
    fetchCheckNFT();
  }, []);

  return (
    <div className="main">
      <section className="title text--center">
        <div className="container">
          <h1 className="HIW text--h1">Create Collections</h1>
        </div>
      </section>

      {isLoading === true ? (
        <section className="section section-buy-nft">
          <h2 className="text--h2 ma--bottom">Loading...</h2>
        </section>
      ) : (
        <section className="flex">
          {nftData.length === 0 ? (
            <section className="section section-buy-nft">
              <h2 className="text--h2 ma--bottom">No NFTs Listed</h2>
            </section>
          ) : (
            nftData.map((data, id) => {
              return (
                <MintbaseNFT nft={data} buttonName={"Create Collection"} route={"create"} key={id} />
              );
            })
          )}
        </section>
      )}
    </div>
  );
};

export default CreateCollection;
