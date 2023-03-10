import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";

import axios from "axios";

const UploadFiles = () => {
  const [nftData, setNftData] = useState();
  const [collectionImages, setCollectionImages] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const { activeAccountId } = useWallet();

  const router = useRouter();
  const metadata_id = router.query.metadata_id;

  useEffect(() => {
    async function fetchGraphQL(operationsDoc, operationName, variables) {
      const result = await fetch(
        "https://interop-testnet.hasura.app/v1/graphql",
        {
          method: "POST",
          body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
          }),
        }
      );

      return await result.json();
    }

    const operations = (metadata_id) => {
      return `
      query MyQuery {
        mb_views_active_listings(
          where: {metadata_id: {_eq: "${metadata_id}"}}
          distinct_on: metadata_id
        ) {
          description
          media
          metadata_id
          price
          title
        }
      }    
    `;
    };

    async function fetchCheckNFT() {
      const { errors, data } = await fetchGraphQL(
        operations(metadata_id),
        "MyQuery",
        {}
      );
      setNftData(data.mb_views_active_listings[0]);
    }
    fetchCheckNFT();
  }, [activeAccountId]);

  const onClickFilesBtn = async (e) => {
    e.preventDefault();


    setIsUploading(true);

  

    var formdata = new FormData();

    formdata.append("name", nftData.title);
    formdata.append("description", nftData.description);
    formdata.append("price", nftData.price);
    formdata.append("metadata_id", metadata_id);
    formdata.append("nftImage", nftData.media);
    formdata.append("connectedAccount", activeAccountId);

    Object.values(collectionImages).forEach((el) => {
      formdata.append("files", el, el.name);
    });

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/addCollection`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        window.location.href = `/collection/${metadata_id}`;
        setIsUploading(false);
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const ele = nftData ? (
    <>
      <section
        className="profile-section padding-top padding-bottom"
        style={{ backgroundColor: "#1a203c" }}
      >
        <div className="container">
          <div className="section-wrapper">
            <div className="member-profile">
              <div className="profile-item">
                <div className="profile-cover">
                  <img
                    src="../assets/images/profile/cover.jpg"
                    alt="cover-pic"
                  />
                </div>
                <div className="profile-information">
                  <div className="profile-pic">
                    <img src={nftData.media} alt="DP" />
                  </div>
                  <div className="profile-name">
                    <h4 style={{ textAlign: "left" }}>{nftData.title}</h4>
                    <p>{nftData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="tab-pane fade mentions-section show active"
        id="pills-personal"
        role="tabpanel"
        aria-labelledby="pills-personal-tab"
      >
        <div className="row">
          <div className="col">
            <div className="create-nft py-5 px-4 d-flex justify-content-center">
              <form className="create-nft-form col-8">
                <div className="upload-item mb-30">
                  {collectionImages ? (
                    <p>Images Added, Ready to Create Collection...</p>
                  ) : (
                    <p>PNG,JPG,JPEG,SVG,WEBP</p>
                  )}

                  <div className="custom-upload">
                  {collectionImages ? (
                    <div className="file-btn">
                      <i className="icofont-check"></i>
                      Added
                    </div>                  ) : (
                    <div className="file-btn">
                    <i className="icofont-upload-alt"></i>
                    Upload a Images
                  </div>
                  )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      name="title"
                      onChange={(e) => {
                        setCollectionImages(e.currentTarget.files);
                      }}
                      multiple
                      id="form-nftImage"
                    />
                  </div>
                </div>
                <div className="submit-btn-field text-center">
                  {isUploading ? (
                    <button type="submit">Uploading...</button>
                  ) : (
                    <button
                      type="submit"
                      id="btn-upload-file"
                      onClick={(e) => onClickFilesBtn(e)}
                    >
                      Create Collection
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <section className="page-header-section style-1 vh-100">
    <div className="container">
      <div className="page-header-content">
        <div className="page-header-inner">
          <div className="page-title">
            <h2>Loading... </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
  return ele;
};

export default UploadFiles;
