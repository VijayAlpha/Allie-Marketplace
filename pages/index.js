import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Wallet, Chain, Network } from "mintbase";
import { useEffect, useState } from "react";
import { Collection } from "../components/collection";
import axios from "axios";

export default function Home() {
  const [content, setContent] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/collection");

      setContent(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <head>
        <link rel="shortcut icon" href="/square.svg" type="image/x-icon" />
        <title>Allie eve knox</title>
      </head>

      <section className="hero">
        <div className="hero__col-1">
          <h1 className="hero__heading ma--bottom">This is Allie eve knox.</h1>
          <h3 className="hero__sub-heading text--h2 ma--bottom">
            This is my own marketplace where you can buy NFT to view my content
            on go with NFT.
          </h3>
          <div className="ma--top-side">
            <Link href="#collection">
              <button className="btn btn--1x text-base--1 hero__btn">
                Take a ride
              </button>
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="collection">
            <div className="collection__left">
              <div className="right">
                <img
                  src="https://pbs.twimg.com/media/FhiBna1WQAE4Jah?format=jpg&name=small"
                  alt="NFT image"
                  className="collection__nft ma--bottom"
                />
                <h2 className="collection__name ma--bottom">
                  My Birthday celebration
                </h2>
                <p className="collection__description ma--bottom text-base--1">
                  This collection is full of me on my Birthday.
                </p>
                <span className="collection__price text--h2 ma--bottom">
                  32
                </span>
                <img
                  src="https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=023"
                  alt="NEAR"
                  className="collection__price--img"
                />
              </div>
              <div className="left">
                <button
                  className="btn collection__btn"
                  id="btn-unlock-collection"
                  data-nftid="loyalticket.mintspace2.testnet:8c81bb5b7c8fe197865be325f614770c"
                >
                  Unlock Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-collection ma--bottom-lg ma--top-lg">
        <h2 className="section__title ma--bottom text--h1">Collections</h2>
        <h2 className="text--h2 ma--bottom-lg">
          Buy NFT To Unlock Each Of My Content
        </h2>
        <div className="flex">
          {content ? (
            content.collection &&
            content.collection.map((post) => {
              return <Collection post={post} />;
            })
          ) : (
            <h1>hi</h1>
          )}
        </div>
      </section>
    </>
  );
}
