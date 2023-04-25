import { useEffect, useState } from "react";
import { CollectionCard } from "../components/CollectionCard";
import { WalletSection } from "../components/WalletSection";
import { MainSection } from "../components/MainSection";
import axios from "axios";

export default function Home() {
  const [collection, setCollection] = useState();
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection`
        );

        setCollection(res.data?.collection.reverse());
      } catch (err) {
        setContent("Something went wrong!");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <MainSection collection={collection ? collection[0] : undefined} />
      <WalletSection />

      <section className="ex-drop-section padding-bottom">
        <div className="container">
          <div className="section-header style-4">
            <div className="header-shape">
              <span></span>
            </div>
            <h3>NSFW Collections</h3>
          </div>
          <div className="section-wrapper">
            <div className="ex-drop-wrapper">
              <div className="row gx-4 gy-3 d-flex justify-content-start">
                {collection ? (
                  collection.length !== 0 ? (
                    collection.map((post, id) => {
                      return <CollectionCard post={post} key={id} />;
                    })
                  ) : (
                    <h3>Sorry!... There is No Collection Now.</h3>
                  )
                ) : (
                  <h1>{content}</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /* <HowItWorks /> */}
    </>
  );
}
