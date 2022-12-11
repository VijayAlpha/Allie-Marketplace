import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Wallet, Chain, Network, MetadataField } from "mintbase";
import axios from "axios";
import { MintbaseNFT } from "../../components/mintBaseNFT";

const UploadFiles = () => {
  const envVar = {
    mintBaseApi: "511a3b51-2ed5-4a27-b165-a27a01eebe0a",
    backendUrl: "http://localhost:8000",
  };

  const router = useRouter();
  const metadata_id = router.query.metadata_id;

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

    const operations = (metadata_id) => {
      return `
      query MyQuery {
        mb_views_active_listings(
          where: {metadata_id: {_eq: "${metadata_id}"}}
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
        operations(metadata_id),
        "MyQuery",
        {}
      );
      setNftData(data.mb_views_active_listings[0]);
    }
    fetchCheckNFT();
  });

  const onClickFilesBtn = async () => {
    const { data, error } = await new Wallet().init({
      networkName: Network.testnet,
      chain: Chain.near,
      apiKey: envVar.mintBaseApi,
    });
    const { wallet } = data;

    const signerRes = await wallet.signMessage("test-message");
    const res = await axios({
      method: "POST",
      url: `${envVar.backendUrl}/api/collection/addCollection`,
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

  const ele = nftData ? (
    <>
      <section class="title text--center">
        <div class="container">
          <h1 class="HIW text--h1">Add Images To Create.</h1>
        </div>
      </section>
      <section className="section section-list ma--bottom-lg">
        <MintbaseNFT nft={nftData} buttonName={null} />
        <div className="create-collection__file-preview">
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
            className="btn collection__btn"
            id="btn-upload-file"
            onClick={() => onClickFilesBtn()}
          >
            Create Collection
          </button>
        </div>
      </section>
    </>
  ) : (
    <>
      <h1>hi</h1>
    </>
  );
  return ele;
};

export default UploadFiles;
