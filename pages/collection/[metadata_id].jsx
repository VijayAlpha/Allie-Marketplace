/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Wallet, Chain, Network } from "mintbase";
import axios from "axios";
import { Buy } from "../../components/Buy";
import { MediaCollection } from "../../components/MediaCollection";

export default function SingleCollection() {
  const [collectionData, setColllectionData] = useState();
  const [err, setErr] = useState();
  const [userName, setUsername] = useState();
  const [wallet, setWallet] = useState();

  const router = useRouter();
  const metadata_id = router.query.metadata_id;

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data, error } = await new Wallet().init({
          networkName: Network.testnet,
          chain: Chain.near,
          apiKey: process.env.NEXT_PUBLIC_MINTBASE_API,
        });
        const { wallet, isConnected } = data;

        setWallet(wallet);

        if (isConnected) {
          const { data: details } = await wallet.details();
          setUsername(details.accountId);
        }

        const signerRes = await wallet.signMessage("test-message");

        const res = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/${metadata_id}`,
          data: {
            metadata_id,
            signerRes,
          },
        });
        console.log(res.data);
        setColllectionData(res.data.collection);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    };
    checkAccess();
  }, [metadata_id]);

  const deleteCollection = async () => {
    try {
      const signerRes = await wallet.signMessage("test-message");

      const res = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/${metadata_id}`,
        data: {
          signerRes,
        },
      });

      if (res) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buy = err ? (
    <Buy meta={metadata_id} />
  ) : (
    <section className="section section-buy-nft">
      <h1 className="text--h1">Checking Access... Please wait</h1>
    </section>
  );
  const element = collectionData ? (
    <>
      <header className="header">
        <div className="">
          <img
            src={collectionData.nftImage}
            className="collection__nft"
            alt="NFT image"
          />
        </div>

        <div className="header__right">
          <h2 className="collection__name ma--bottom">{collectionData.name}</h2>
          <p className="collection__description ma--bottom text-base--1">
            {collectionData.description}
          </p>
          <span className="collection__price text--h2">
            {Math.round(
              collectionData.price.toLocaleString("fullwide", {
                useGrouping: false,
              }) *
                10 ** -24
            )}{" "}
            NEAR
          </span>
          {userName === process.env.NEXT_PUBLIC_OWNER ? (
            <>
              <button className="btn btn--primary text-base--1 ma--lg btn__disable">
                Edit Collection
              </button>

              <button
                className="btn btn--primary text-base--1 ma--lg btn__red"
                onClick={() => deleteCollection()}
              >
                Delete
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>

      <section className="section section-media">
        <div className="media">
          {collectionData ? (
            collectionData.files.map((img, i) => {
              return <MediaCollection img={img} key={i} />;
            })
          ) : (
            <section class="section section-buy-nft">
              <h1 className="text--h1">Loading....</h1>
            </section>
          )}
        </div>
      </section>
    </>
  ) : (
    buy
  );
  return element;
}
