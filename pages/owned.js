import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import axios from "axios";
import { CollectionCard } from "../components/CollectionCard";
import fetchGraphQL from "../packages/FetchGraphQL";

const CollectionPage = () => {
  const [collection, setCollection] = useState();
  const [ownedNFT, setOwnedNFT] = useState();
  const [ownedCollection, setOwnedCollection] = useState();
  const [content, setContent] = useState("Loading...");
  const { activeAccountId } = useWallet();

  useEffect(() => {
    const loadOwnedNFT = async () => {
      try {
        const contract_id = process.env.NEXT_PUBLIC_CONTRACT_ID;

        const TOKEN_QUERY = (accountId, contract_id) => {
          return `
          query ownedNFT {
            mb_views_nft_tokens(
              distinct_on: reference
              where: {owner: {_eq: "${accountId}"}, nft_contract_id: {_eq: "${contract_id}"}}
            ) {
              nft_contract_id
              title
              description
              media
              metadata_id
              minted_timestamp
            }
          }  
        `;
        };
        const returnedNftList = await fetchGraphQL(
          TOKEN_QUERY(activeAccountId, contract_id),
          "ownedNFT",
          {}
        );
        setOwnedNFT(returnedNftList.data.mb_views_nft_tokens);
      } catch (error) {
        setContent("Something went wrong!");
      }
    };

    const fetchAllCollection = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection`
        );

        setCollection(res.data?.collection);
      } catch (err) {
        setContent("Something went wrong!");
      }
    };

    const sortOwnedCollection = async () => {
      const findMatchingItems = (arr1, arr2, property) =>
        arr1?.filter((item1) =>
          arr2?.some((item2) => item1[property] === item2[property])
        );

      const matchingCollection = findMatchingItems(
        collection,
        ownedNFT,
        "metadata_id"
      );

      setOwnedCollection(matchingCollection);
    };

    if (activeAccountId && !ownedCollection) {
      loadOwnedNFT();
      fetchAllCollection();
      sortOwnedCollection();
    }
  }, [activeAccountId, collection, ownedNFT, ownedCollection]);

  return (
    <>
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Owned Collections </h2>
              </div>
              <ol className="breadcrumb">
                <li className="active">Explore</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-section padding-top padding-bottom min-vh-100">
        <div className="container">
          <div className="section-wrapper">
            <div className="explore-wrapper">
              <div className="row justify-content-start gx-4 gy-3">
                {ownedCollection ? (
                  ownedCollection.length !== 0 ? (
                    ownedCollection.map((post, id) => {
                      return <CollectionCard post={post} key={id} />;
                    })
                  ) : (
                    <h3>You own 0 Collection</h3>
                  )
                ) : (
                  <h1>{content}</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollectionPage;
