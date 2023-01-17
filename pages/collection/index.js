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
          <div className="section-header">
            <div className="nft-filter d-flex flex-wrap justify-content-center">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="catSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>All Category</option>
                  <option value="1">Art</option>
                  <option value="2">Music</option>
                  <option value="3">Video</option>
                  <option value="3">Digital Anime</option>
                </select>
                <label for="catSelect">Select a Category</label>
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id="sortSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Newest</option>
                  <option value="1">Trending</option>
                  <option value="2">Most Viewed</option>
                  <option value="3">Less Viewed</option>
                  <option value="3">Ending Soon</option>
                  <option value="3">Recently Sold </option>
                  <option value="3">Recently Created </option>
                  <option value="3">Recently Viewed </option>
                  <option value="3">Ending Soon</option>
                </select>
                <label for="sortSelect">Sort By</label>
              </div>
            </div>
            {/* <div className="nft-search">
                    <div className="form-floating nft-search-input">
                        <input type="text" className="form-control" id="nftSearch" placeholder="Search NFT" />
                        <label for="nftSearch">Search NFT</label>
                        <button type="button"> <i className="icofont-search-1"></i></button>
                    </div>
                </div> */}
          </div>
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
              <div className="load-btn mt-5">
                <a href="#" className="default-btn move-bottom">
                  <span>Load More</span>
                </a>
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
