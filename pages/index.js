import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Wallet, Chain, Network } from "mintbase";
import { useEffect, useState } from "react";
import { Collection } from "../components/collection";
import axios from "axios";
import { MainSection } from "../components/MainSection";
import { HowItWorks } from "../components/HowItWorks";

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
      <Head>
        <link rel="shortcut icon" href="/square.svg" type="image/x-icon" />
        <title>Allie eve knox</title>
      </Head>
      <MainSection />
      <section className="section section-collection ma--bottom-lg ma--top-lg">
        <h2 className="section__title ma--bottom text--h1">Collections</h2>
        <h2 className="text--h2 ma--bottom-lg">
          Buy NFT To Unlock Each Of My Content
        </h2>
        <div className="flex">
          {content ? (
            content.collection.length !== 0 ? (
              content.collection &&
              content.collection.map((post, id) => {
                return <Collection post={post} key={id} />;
              })
            ) : (
              <h1>Sorry!... There is No Collection Now.</h1>
            )
          ) : (
            <h1>Loading..</h1>
          )}
        </div>
      </section>
      <HowItWorks />
    </>
  );
}
