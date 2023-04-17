import { useEffect, useState } from "react";
import { CollectionCard } from "./../../components/CollectionCard";
import axios from "axios";

const CollectionPage = () => {
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
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Explore All Collections </h2>
              </div>
              <ol className="breadcrumb">
                <li className="active">Explore</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-section padding-top padding-bottom">
        <div className="container">
          <div className="section-wrapper">
            <div className="explore-wrapper">
              <div className="row justify-content-start gx-4 gy-3">
                {content ? (
                  content.collection.length !== 0 ? (
                    content.collection &&
                    content.collection.map((post, id) => {
                      return <CollectionCard post={post} key={id} />;
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

      {/* {content ? (
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
      )} */}
    </>
  );
};

export default CollectionPage;
