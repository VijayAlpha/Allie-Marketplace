import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Wallet, Network, Chain } from "mintbase";
import { MintbaseNFT } from "../../components/MintBaseNFT";

const List = () => {
  const router = useRouter();

  const metadataId = router.query.metadata_id;

  const [nftData, setNftData] = useState({});
  const [listPrice, setListPrice] = useState();
  const [listAmount, setListAmount] = useState();

  const listNFT = async (e) => {
    e.preventDefault();

    const { data, error } = await new Wallet().init({
      networkName: Network.testnet,
      chain: Chain.near,
      apiKey: process.env.NEXT_PUBLIC_MINTBASE_API,
    });

    const { wallet } = data;

    let price = `${(listPrice ** 24).toLocaleString("fullwide", {
      useGrouping: false,
    })}`;

    wallet.list(nftData.token_id, nftData.nft_contract_id, price);
  };

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
          token_id
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
      <section className="title text--center">
        <div className="container">
          <h1 className="HIW text--h1">List NFT for Sale</h1>
        </div>
      </section>

      <section className="section section-list ma--bottom-lg">
        <MintbaseNFT nft={nftData} buttonName={null} />

        <form id="form-list-nft">
          <div className="">
            <label> Price to List </label>
            <input
              type="number"
              name="price"
              id="input-list-price"
              placeholder="NEAR"
              onChange={(e) => {
                setListPrice(e.currentTarget.value);
              }}
            />
          </div>
          <div className="">
            <label> Amount to list </label>
            <input
              type="number"
              name="amount"
              id="input-list-amount"
              placeholder="1"
            />
          </div>
          <button
            className="btn btn--primary text-base--1 ma--top-side"
            id="btn-list-nft"
            onClick={(e) => listNFT(e)}
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
