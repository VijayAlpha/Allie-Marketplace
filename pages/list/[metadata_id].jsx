/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import { depositStorage, execute, list, mint } from "@mintbase-js/sdk";
import { utils } from "near-api-js";

const List = () => {
  const router = useRouter();
  const metadataId = router.query.metadata_id;

  const { selector, activeAccountId } = useWallet();
  const [nftAmount, setNftAmount] = useState();
  const [token, setToken] = useState({});
  const [totalToken, setTotalToken] = useState();
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

    const amountInYocto = utils.format.parseNearAmount(listPrice);

    for (let i = 0; i < listAmount; i++) {
      listArg.push(
        list({
          contractAddress: token.nft_contract_id,
          marketAddress: marketAddress,
          tokenId: `${parseInt(token.token_id++)}`,
          price: amountInYocto,
        })
      );
    }

    const currentUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const apiUrl = `${currentUrl}/create`;

    await execute({ wallet, callbackUrl: `${apiUrl}` }, listArg);
  };

  const handleMintMore = async (e) => {
    e.preventDefault();
    if (!activeAccountId) return;

    const currentUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const apiUrl = `${currentUrl}/list`;

    const wallet = await selector.wallet();

    execute(
      {
        wallet,
        callbackUrl: `${apiUrl}`,
      },
      mint({
        ownerId: activeAccountId,
        metadata: { reference: token.reference },
        noMedia: true,
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ID,
        amount: parseInt(nftAmount),
      })
    );
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
          where: {metadata_id: {_eq: "${metadata_id}"} , listings: {metadata_id: {_is_null: false}}}
          order_by: {token_id: asc}
        ) {
          description
          media
          metadata_id
          title
          copies
          nft_contract_id
          token_id
          reference
          listings {
            token_id
          }
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

      // To get the total numbers of tokens even after extra mints added
      let arrayList = data.mb_views_nft_tokens;
      let totalTokens =
        parseInt(arrayList[arrayList.length - 1]?.token_id) -
        parseInt(arrayList[0]?.token_id);
      setTotalToken(totalTokens);

      let totalListedTokens = null;
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
          <div className="row g-5 align-items-center flex-row-reverse">
            <div className="col-lg-5">
              <div className="account-wrapper">
                <h4 className="subtitle mb-4 d-block ">{token.title}</h4>
                <div className="account-bottom" style={{ textAlign: "start" }}>
                  <span className="d-block cate pt-10 mb-3">
                    <a href="#"> Total Tokens:</a> {totalToken}
                  </span>
                  <span className="d-block cate pt-10 mb-3">
                    <a href="#"> Description:</a> {token.description}
                  </span>
                </div>
                <form className="account-form" onSubmit={handleListToken}>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      min="0"
                      step="0.0000001"
                      placeholder="10 NEAR"
                      onChange={(e) => {
                        setListPrice(e.currentTarget.value);
                      }}
                    />
                    <label htmlFor="floatingInput">Price of each Token</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="listtokeamount"
                      placeholder="50"
                      min="1"
                      max={token.copies}
                      onChange={(e) => {
                        setListAmount(e.currentTarget.value);

                        console.log(totalToken);
                      }}
                    />
                    <label htmlFor="floatingPassword">
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
                <h5 className="subtitle mb-4 mt-5 d-block">Mint More Token</h5>
                <form className="account-form" onSubmit={handleMintMore}>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="listtokeamount"
                      placeholder="50"
                      min="1"
                      max="100"
                      onChange={(e) => {
                        setNftAmount(e.currentTarget.value);
                      }}
                    />
                    <label htmlFor="floatingPassword">
                      How many tokens to mint
                    </label>
                  </div>

                  <div className="form-group">
                    <button
                      className="d-block default-btn move-top"
                      type="submit"
                    >
                      <span>Multipy</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-7">
              <div
                className="account-img"
                style={{ height: "50vh", textAlign: "center" }}
              >
                <img
                  src={token.media ? token.media : "/no-image.png"}
                  alt="nft-image"
                  style={{
                    margin: "1.5rem",
                    borderRadius: "8px",
                    width: "90%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Something went wrong <br/> Try again...</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="login-section padding-top padding-bottom">
        <div className="container" style={{ height: "50vh" }}></div>
      </div>
    </>
  );

  return element;
};

export default List;
