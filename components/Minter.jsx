import { Wallet, Chain, Network, MetadataField } from "mintbase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Minter = () => {
  const envVar = {
    mintBaseApi: process.env.NEXT_PUBLIC_MINTBASE_API,
    backendUrl: "http://localhost:8000",
    contract_id: process.env.NEXT_PUBLIC_CONTRACT_ID,
  };

  const router = useRouter();
  const [nftTitle, setNftTitle] = useState();
  const [nftDescription, setNftDescription] = useState();
  const [nftImage, setNftImage] = useState();
  const [nftAmount, setNftAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // console.log(nftImage);
  const onClickMint = async (e) => {
    setIsLoading(true);

    const formData = {
      title: nftTitle,
      description: nftDescription,
      image: nftImage,
      amount: Number(nftAmount),
    };

    e.preventDefault();
    const { data, error } = await new Wallet().init({
      networkName: Network.testnet,
      chain: Chain.near,
      apiKey: process.env.NEXT_PUBLIC_MINTBASE_API,
    });
    const { wallet } = data;

    const { data: fileUploadResult, error: fileError } =
      await wallet.minter.uploadField(MetadataField.Media, formData.image);

    if (fileError) {
      console.error("ERROR : ", fileError);
    }

    await wallet.minter.setMetadata({
      title: formData.title,
      description: formData.description,
    });

    await wallet.mint(
      formData.amount,
      envVar.contract_id,
      undefined,
      undefined,
      undefined
    );
    setIsLoading(false);
  };

  return (
    <div className="main">
      <section className="title text--center">
        <div className="container">
          <h1 className="HIW text--h1">Create Collection</h1>
          <h2 className="text--h2 ma--bottom">
            Mint the NFT, Upload the Videos and Create the collection.
          </h2>
        </div>
      </section>

      <section className="section section-collection ma--bottom-lg">
        <form>
          <div className="">
            <label htmlFor="form-title">Name </label>
            <input
              type="text"
              name="title"
              id="form-title"
              onChange={(e) => {
                setNftTitle(e.currentTarget.value);
              }}
              className="input input__text"
              placeholder="Halloween Nights NFT"
            />
          </div>
          <div className="">
            <label htmlFor="form-title">Description </label>
            <textarea
              name="description"
              id="form-description"
              rows="8"
              onChange={(e) => {
                setNftDescription(e.currentTarget.value);
              }}
              placeholder="This a NFT that containes 25+ Halloween Nights collections."
            ></textarea>
          </div>
          <div className="">
            <label htmlFor="form-title"> Image </label>
            <input
              type="file"
              accept="image/*"
              name="title"
              onChange={(e) => {
                setNftImage(e.currentTarget.files[0]);
              }}
              id="form-nftImage"
            />
          </div>

          <div className="">
            <label htmlFor="form-nft-amount"> Amount to mint </label>
            <input
              type="number"
              name="amount"
              id="form-nft-amount"
              onChange={(e) => {
                setNftAmount(e.currentTarget.value);
              }}
            />
          </div>
          {isLoading ? (
            <button
              className="btn btn--primary text-base--1 ma--top-side"
              id="btn-mint-nft"
            >
              Loading...
            </button>
          ) : (
            <button
              className="btn btn--primary text-base--1 ma--top-side"
              id="btn-mint-nft"
              onClick={(e) => onClickMint(e)}
            >
              Mint NFT
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

export default Minter;
