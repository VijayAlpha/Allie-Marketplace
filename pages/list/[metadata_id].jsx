import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import { depositStorage, execute, list } from "@mintbase-js/sdk";

const List = () => {
  const router = useRouter();
  const metadataId = router.query.metadata_id;

  const { selector } = useWallet();
  const [token, setToken] = useState({});
  const [listPrice, setListPrice] = useState();
  const [listAmount, setListAmount] = useState();

  const handleListToken = async (e) => {
    e.preventDefault();

    const wallet = await selector.wallet();

    const marketAddress =
      process.env.NEXT_PUBLIC_NEAR_NETWORK === "mainnet"
        ? "simple.market.mintbase1.near"
        : "market-v2-beta.mintspace2.testnet";

    if (!token) return;

    let listArg = [
      depositStorage({
        listAmount: listAmount,
        marketAddress: marketAddress,
      }),
    ];

    for (let i = 0; i < listAmount; i++) {
      listArg.push(
        list({
          contractAddress: token.nft_contract_id,
          marketAddress: marketAddress,
          tokenId: `${parseInt(token.token_id) + (i + 1)}`,
          price: `${listPrice + "0".repeat(24)}`,
        })
      );
    }

    await execute({ wallet }, listArg);
  };

  useEffect(() => {
    async function fetchGraphQL(operationsDoc, operationName, variables) {
      const qureyHttpLink =
        process.env.NEXT_PUBLIC_NEAR_NETWORK === "mainnet"
          ? "https://interop-mainnet.hasura.app/v1/graphql"
          : "https://interop-testnet.hasura.app/v1/graphql";

      const result = await fetch(qureyHttpLink, {
        method: "POST",
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName,
        }),
      });

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
      setToken(data.mb_views_nft_tokens[0]);
    }

    fetchCheckNFT();
  });

  const element = token ? (
    <>
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>List For Sale</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="login-section padding-top padding-bottom">
        <div className=" container">
          <div className="row g-5 align-items-center flex-md-row-reverse">
            <div className="col-lg-5">
              <div className="account-wrapper">
                <div className="account-bottom" style={{ textAlign: "start" }}>
                  <h5 className="subtitle">Title: {token.title}</h5>

                  <span className="d-block cate pt-10 mb-5">
                    {" "}
                    <a href="#"> Description:</a> {token.description}{" "}
                  </span>
                </div>
                <form className="account-form" onSubmit={handleListToken}>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      min="1"
                      placeholder="10 NEAR"
                      onChange={(e) => {
                        setListPrice(e.currentTarget.value);
                      }}
                    />
                    <label for="floatingInput">Price of each Token</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="50"
                      min="1"
                      max={token.copies}
                      onChange={(e) => {
                        setListAmount(e.currentTarget.value);
                      }}
                    />
                    <label for="floatingPassword">
                      How many tokens to list
                    </label>
                  </div>

                  <div className="form-group">
                    {listAmount && listPrice ? (
                      <button
                        className="d-block default-btn move-top"
                        type="submit"
                      >
                        <span>List For Sale</span>
                      </button>
                    ) : (
                      <button
                        className="d-block default-btn move-top"
                        type="submit"
                        style={{ cursor: "not-allowed" }}
                      >
                        <span>List For Sale</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="account-img" style={{ height: "50vh" }}>
                <img
                  src={token.media ? token.media : "/no-image.png"}
                  alt="nft-image"
                  style={{ height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );

  return element;
};

export default List;
