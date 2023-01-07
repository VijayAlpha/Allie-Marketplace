import { useEffect, useState } from "react";
import { Collection } from "../components/collection";
import { WalletSection } from "../components/WalletSection";
import { MainSection } from "../components/MainSection";
import { HowItWorks } from "../components/HowItWorks";
import axios from "axios";


export default function Home() {
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection`
      );

      setContent(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <MainSection />
      <WalletSection collection={content} />

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
              <div className="row justify-content-center gx-4 gy-3">
                {content ? (
                  content.collection.length !== 0 ? (
                    content.collection &&
                    content.collection.map((post, id) => {
                      return <Collection post={post} key={id} />;
                    })
                  ) : (
                    <h3>Sorry!... There is No Collection Now.</h3>
                  )
                ) : (
                  <h1>Loading..</h1>
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
