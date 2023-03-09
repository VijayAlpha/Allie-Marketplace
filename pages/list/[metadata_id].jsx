import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import { depositStorage, execute, list } from "@mintbase-js/sdk";

const List = () => {
  const router = useRouter();
  const metadataId = router.query.metadata_id;

  const { selector, activeAccountId } = useWallet();
  const [token, setToken] = useState({});
  const [listPrice, setListPrice] = useState();
  const [listAmount, setListAmount] = useState();

  const listNFT = async (e) => {
    e.preventDefault();

    let price = `${(listPrice ** 24).toLocaleString("fullwide", {
      useGrouping: false,
    })}`;
  };

  const handleListToken = async (e) => {
    e.preventDefault();

    const wallet = await selector.wallet();

    const marketAddress = "market-v2-beta.mintspace2.testnet";

    if (!token) return;

    await execute({ wallet }, [
      depositStorage({
        listAmount: listAmount,
        marketAddress: marketAddress,
      }),
      list({
        contractAddress: token.nft_contract_id,
        marketAddress: marketAddress,
        tokenId: token.token_id,
        price: `5${"0".repeat(23)}`,
      }),
    ]);
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
                <div className="account-bottom">
                  <h5 className="subtitle">Title: {token.title}</h5>

                  <span className="d-block cate pt-10 mb-5">
                    {" "}
                    <a href="#"> Description:</a> {token.description}{" "}
                  </span>
                </div>
                <form className="account-form">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="10 NEAR"
                      onChange={(e) => {
                        setListPrice(e.currentTarget.value);
                      }}
                    />
                    <label for="floatingInput">Price</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="50"
                    />
                    <label for="floatingPassword">Amount</label>
                  </div>

                  <div className="form-group">
                    <button
                      className="d-block default-btn move-top"
                      onClick={handleListToken}
                    >
                      <span>List For Sale</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="account-img">
                <img
                  src={token.media ? token.media : "/no-image.png"}
                  alt="nft-image"
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
