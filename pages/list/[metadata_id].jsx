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
      <div class="login-section padding-top padding-bottom">
        <div class=" container">
          <div class="row g-5 align-items-center flex-md-row-reverse">
            <div class="col-lg-5">
              <div class="account-wrapper">
                <div class="account-bottom">
                  <h5 class="subtitle">Title: {nftData.title}</h5>

                  <span class="d-block cate pt-10 mb-5">
                    {" "}
                    <a href="#"> Description:</a>{" "}
                    {nftData.description}{" "}
                  </span>
                </div>
                <form class="account-form">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingInput"
                      placeholder="10 NEAR"
                      onChange={(e) => {
                        setListPrice(e.currentTarget.value);
                      }}
                    />
                    <label for="floatingInput">Price</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="50"

                    />
                    <label for="floatingPassword">Amount</label>
                  </div>
                  {/* <div class="form-group">
                                <div class="d-flex justify-content-between flex-wrap pt-sm-2">
                                    <div class="checkgroup">
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label for="remember">Remember Me</label>
                                    </div>
                                    <a href="forgot-pass.html">Forgot Password?</a>
                                </div>
                            </div> */}
                  <div class="form-group">
                    <button class="d-block default-btn move-top" onClick={(e) => listNFT(e)}>
                      <span>List For Sale</span>
                    </button>
                  </div>
                </form>
               
              </div>
            </div>
            <div class="col-lg-7">
              <div class="account-img">
                <img
                  src={nftData.media ? nftData.media : "/no-image.png"}
                  alt="nft-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="title text--center">
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
      </section> */}
    </>
  ) : (
    <></>
  );

  return element;
};

export default List;
