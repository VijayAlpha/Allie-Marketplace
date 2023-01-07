import { useEffect, useState } from "react";
import { Collection } from "../../components/Collection";
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
      <section class="page-header-section style-1">
        <div class="container">
          <div class="page-header-content">
            <div class="page-header-inner">
              <div class="page-title">
                <h2>Explore All Collections </h2>
              </div>
              <ol class="breadcrumb">
                <li class="active">Explore</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section class="explore-section padding-top padding-bottom">
        <div class="container">
          <div class="section-header">
            <div class="nft-filter d-flex flex-wrap justify-content-center">
              <div class="form-floating">
                <select
                  class="form-select"
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
              <div class="form-floating">
                <select
                  class="form-select"
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
            {/* <div class="nft-search">
                    <div class="form-floating nft-search-input">
                        <input type="text" class="form-control" id="nftSearch" placeholder="Search NFT" />
                        <label for="nftSearch">Search NFT</label>
                        <button type="button"> <i class="icofont-search-1"></i></button>
                    </div>
                </div> */}
          </div>
          <div class="section-wrapper">
            <div class="explore-wrapper">
              <div class="row justify-content-center gx-4 gy-3">
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
              <div class="load-btn mt-5">
                <a href="#" class="default-btn move-bottom">
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
