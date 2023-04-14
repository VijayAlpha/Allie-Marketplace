import { useEffect, useState } from "react";
import { Wallet, Chain, Network, MetadataField } from "mintbase";
import axios from "axios";

const uploadFiles = () => {
  const [nftData, setNftData] = useState({});
  const [nftImages, setNftImages] = useState();
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
  let metadata_id = nftData.metadata_id;
  const onClickFilesBtn = async () => {
    const { data, error } = await new Wallet().init({
      networkName: Network.testnet,
      chain: Chain.near,
      apiKey: "511a3b51-2ed5-4a27-b165-a27a01eebe0a",
    });
    const { wallet } = data;

    const signerRes = await wallet.signMessage("test-message");
    const res = await axios({
      method: "POST",
      url: `http://localhost:8000/api/collection/addCollection`,
      data: {
        name: nftData.title,
        description: nftData.description,
        files: nftImages,
        price: 0,
        metadata_id,
        nftImage: nftData.media,
        signerRes,
      },
    });
    console.log(res.json());
  };
  console.log(`nftimage: ${nftImages}`);
  const ele = nftData ? (
    <>
      <div class="collection">
        <div class="collection__left">
          <div class="right">
            <img
              src={nftData.media}
              alt="NFT image"
              class="collection__nft ma--bottom"
            />
            <h2 class="collection__name ma--bottom">Title : {nftData.title}</h2>
            <p class="collection__description ma--bottom text-base--1">
              Description : {nftData.description}
            </p>
            <span class="collection__price text--h2 ma--bottom">
              No of NFT : {nftData.copies}
            </span>
          </div>
        </div>
      </div>
      <div class="create-collection__file-preview">
        <input
          type="file"
          accept="image/*"
          name="title"
          //   value={nftImage}
          onChange={(e) => {
            setNftImages(e.currentTarget.files);
          }}
          multiple
          id="form-nftImage"
        />
        <button
          class="btn collection__btn"
          id="btn-upload-file"
          onClick={() => onClickFilesBtn()}
        >
          Upload
        </button>
      </div>
    </>
  ) : (
    <>
      <h1>hi</h1>
    </>
  );
  return ele;
};

export default uploadFiles;
