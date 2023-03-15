/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rqechictkuaydahokxpn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZWNoaWN0a3VheWRhaG9reHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1NDIyNTQsImV4cCI6MTk5NDExODI1NH0._8dFzAKiPBe0sX-bIfgeAU5Zvuk5Q8o8Ju69uH957iQ"
);

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

  const uploadFiles = async (e) => {
    let file;
    if (e.target.files) {
      setCollectionImages(e.target.files);
      file = e.target.files[0];
    }

    Array.from(e.target?.files).forEach(async (file) => {
      const { data, error } = await supabase.storage
        .from("collectionimages")
        .upload(`${nftData.title}/${file?.name}`, file);
      console.log(data);
    });
  };

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let imageImagesURL = [];

    const { data: imageList, error: imageError } = await supabase.storage
      .from("collectionimages")
      .list(`${nftData.title}`, {
        limit: 100,
        offset: 0,
      });

    imageList?.forEach(async (image) => {
      let { data } = await supabase.storage
        .from("collectionimages")
        .getPublicUrl(`${nftData.title}/${image.name}`);
      imageImagesURL.push(data.publicUrl);
    });

    let formData = {
      name: nftData.title,
      description: nftData.description,
      price: nftData.price,
      metadata_id: metadata_id,
      nftImage: nftData.media,
      connectedAccount: activeAccountId,
      files: imageImagesURL
    }

    console.log(formData);

    // var formdata = new FormData();

    // formdata.append("name", nftData.title);
    // formdata.append("description", nftData.description);
    // formdata.append("price", nftData.price);
    // formdata.append("metadata_id", metadata_id);
    // formdata.append("nftImage", nftData.media);
    // formdata.append("connectedAccount", activeAccountId);
    // formdata.append("files", imageImagesURL);

    // console.log(formData);

    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/addCollection`,
      data: formData,
    });

    // console.log(formdata);

    // Object.values(collectionImages).forEach((el) => {
    //   formdata.append("files", el, el.name);
    // });

    // console.log(res);

    // axios
    //   .post(
    //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/addCollection`,
    //     formdata,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     window.location.href = `/collection/${metadata_id}`;
    //     setIsUploading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
                <div className="profile-cover" style={{ height: "300px" }}>
                  <img
                    src={nftData.media}
                    alt="cover-pic"
                    style={{ filter: "blur(10px)" }}
                  />
                </div>
                <div className="profile-information">
                  <div className="profile-pic">
                    <img src={nftData.media} alt="DP" />
                  </div>
                  <div className="profile-name">
                    <h2
                      style={{
                        textAlign: "left",
                        textShadow: "1px 1px 3px #1e1f21",
                      }}
                    >
                      {nftData.title}
                    </h2>
                    {/* <p>{nftData.description}</p> */}
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
                      </div>
                    ) : (
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
                        uploadFiles(e);
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
                      onClick={(e) => handleCreateCollection(e)}
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
