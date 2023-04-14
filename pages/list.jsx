import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const List = () => {
  const router = useRouter();
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
    let nft_contract_id = "neimand7777.mintspace2.testnet";
    const operations = (nft_contract_id) => {
      return `
      query MyQuery {
        mb_views_nft_tokens(
          where: {nft_contract_id: {_eq: "${nft_contract_id}"}}
          order_by: {token_id: desc, minted_timestamp: desc}
          limit: 1
        ) {
          description
          media
          metadata_id
          minter
          owner
          title
          copies
          token_id
          nft_contract_id
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
      // console.log(data.mb_views_nft_tokens[0]);
      setNftData(data.mb_views_nft_tokens[0]);
    }
    fetchCheckNFT();
  }, []);
  //   const [data, setData] = useState();
  //   const [errors, setErrors] = useState();

  console.log(nftData);

  const ele = nftData ? (
    <>
      <div class="">
        <img src={nftData.media} alt="NFT Image" class="ma--bottom" />
      </div>
      <section class="title text--center">
        <div class="container">
          <h1 class="HIW text--h1">Create Collection</h1>
          <h2 class="text--h2 ma--bottom">
            Mint the NFT, Upload the Videos and Create the collection.
          </h2>
        </div>
      </section>

      <section class="section section-collection ma--bottom-lg">
        <form id="form-list-nft">
          <div class="">
            <label for="form-nft-amount"> Price to List </label>
            <input
              type="number"
              name="amount"
              id="input-list-price"
              placeholder="NEAR"
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
    <>
      <h1>hi</h1>
    </>
  );
  return ele;
};

export default List;
