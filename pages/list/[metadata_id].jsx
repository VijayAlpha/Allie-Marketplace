import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MintbaseNFT } from "../../components/MintBaseNFT";

const List = () => {
  const router = useRouter();

  const metadataId = router.query.metadata_id;

  const [nftData, setNftData] = useState({});

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

    const operations = (metadata_id) => {
      return `
      query MyQuery {
        mb_views_nft_tokens(
          where: {metadata_id: {_eq: "${metadata_id}"}}
          limit: 1
        ) {
          description
          media
          metadata_id
          title
          copies
          nft_contract_id
        }
      }
    `;
    };

    async function fetchCheckNFT() {
      const { errors, data } = await fetchGraphQL(
        operations(metadataId),
        "MyQuery",
        {}
      );

      setNftData(data.mb_views_nft_tokens[0]);
    }

    fetchCheckNFT();
  });

  const element = nftData ? (
    <>
      <section class="title text--center">
        <div class="container">
          <h1 class="HIW text--h1">List NFT for Sale</h1>
        </div>
      </section>

      <section class="section section-list ma--bottom-lg">
        <MintbaseNFT nft={nftData} buttonName={null} />

        <form id="form-list-nft">
          <div class="">
            <label for="form-nft-amount"> Price to List </label>
            <input
              type="number"
              name="price"
              id="input-list-price"
              placeholder="NEAR"
            />
          </div>
          <div class="">
            <label for="form-nft-amount"> Amount to list </label>
            <input
              type="number"
              name="amount"
              id="input-list-amount"
              placeholder="1"
            />
          </div>
          <button
            class="btn btn--primary text-base--1 ma--top-side"
            id="btn-list-nft"
            onClick={() => {
              router.push("/uploadFiles");
            }}
          >
            List NFT
          </button>
        </form>
      </section>
    </>
  ) : (
    <section className="section section-buy-nft">
      <h2 className="text--h2 ma--bottom">Loading...</h2>
    </section>
  );

  return element;
};

export default List;
