/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { Buy } from "./../../components/Buy";

export default function SingleCollection() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_API_KEY
  );

  const [collectionData, setColllectionData] = useState();
  const [collectionImages, setColllectionImages] = useState();
  const [newImages, setNewImages] = useState();
  const [imageDeleting, setImageDeleting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isImagesUploaded, setIsImagesUploaded] = useState(false);
  const [accessError, setError] = useState();
  const [userName, setUsername] = useState();

  const router = useRouter();
  const metadata_id = router.query.metadata_id;
  const { activeAccountId } = useWallet();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/${metadata_id}`,
          data: {
            metadata_id,
            connectedAccount: activeAccountId,
          },
        });

        let imagesURL = [];

        const { data: imageList, error: imageError } = await supabase.storage
          .from("collectionimages")
          .list(`${metadata_id}`);

        await imageList?.forEach(async (image) => {
          let { data } = await supabase.storage
            .from("collectionimages")
            .getPublicUrl(`${metadata_id}/${image.name}`);

          imagesURL.push({
            url: data.publicUrl,
            fileName: `${metadata_id}/${image.name}`,
          });
        });
        setColllectionImages(imagesURL);
        setColllectionData(res.data.collection);
      } catch (error) {
        setError(error);
      }
    };
    if (activeAccountId) {
      setUsername(activeAccountId);
      checkAccess();
    }
  }, [activeAccountId, metadata_id]);

  const deleteCollection = async () => {
    try {
      // alert("Click OK to Delete this collection.");
      let promptMsg = prompt("Type 'YES' to Delete this collection.");
      if (promptMsg == "YES") {
        const { data: imageList, error: imageError } = await supabase.storage
          .from("collectionimages")
          .list(`${metadata_id}`);

        await imageList?.forEach(async (image) => {
          const { data, error } = await supabase.storage
            .from("collectionimages")
            .remove(`${metadata_id}/${image.name}`);
        });

        const res = await axios({
          method: "DELETE",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/${metadata_id}`,
          data: {
            connectedAccount: activeAccountId,
          },
        });

        if (res) {
          window.location.href = "/";
        }
      } else {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editImage = async (name) => {
    try {
      setImageDeleting(true);

      const { data, error } = await supabase.storage
        .from("collectionimages")
        .remove(name);

      location.reload();
    } catch (err) {
      setImageDeleting(false);
      console.log(err);
    }
  };

  const uploadFiles = async (e) => {
    if (e.target?.files) {
      setNewImages(e.target.files);

      const files = Array.from(e.target.files);
      let uploadedImage = [];

      files.forEach(async (file, index) => {
        const { data, error } = await supabase.storage
          .from("collectionimages")
          .upload(`${metadata_id}/image-${index}-${Date.now()}`, file);

        if (data) {
          uploadedImage.push(data);
          if (uploadedImage.length === e.target.files.length) {
            setIsImagesUploaded(true);
            location.reload();
          }
        }
      });
    }
  };

  const Element = collectionData ? (
    <>
      <section className="profile-section padding-top padding-bottom">
        <div className="container">
          <div className="section-wrapper">
            <div className="member-profile">
              <div className="profile-item">
                <div className="profile-cover" style={{ height: "300px" }}>
                  <img
                    src={collectionData.nftImage}
                    alt="cover-pic"
                    style={{ filter: "blur(10px)" }}
                  />

                  {userName === process.env.NEXT_PUBLIC_OWNER ? (
                    <>
                      <div className="edit-photo custom-upload d-flex">
                        <div
                          className="file-btn px-2"
                          onClick={() => deleteCollection()}
                        >
                          <i className="icofont-trash"></i>
                          Delete
                        </div>
                        <div
                          className="file-btn px-2"
                          onClick={() => setEditMode(!editMode)}
                        >
                          <i className="icofont-edit"></i>
                          Edit
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="profile-information">
                  <div className="profile-pic">
                    <img src={collectionData.nftImage} alt="DP" />
                  </div>
                  <div className="profile-name">
                    <h2
                      style={{
                        textAlign: "left",
                        textShadow: "1px 1px 3px #1e1f21",
                      }}
                    >
                      {collectionData.name}
                    </h2>
                    {/* <p>{collectionData.description}</p> */}
                  </div>
                </div>
              </div>
              <div className="profile-details">
                <nav className="profile-nav h-100"></nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane activity-page fade show active"
                    id="allNft"
                    role="tabpanel"
                  >
                    <div>
                      <div className="row">
                        <div className="col-xl-12">
                          <article>
                            <div className="activity-tab">
                              <div
                                className="tab-content activity-content"
                                id="pills-tabContent"
                              >
                                {editMode && (
                                  <div className="create-nft py-5 px-4 d-flex justify-content-center mb-5" style={{background: "none"}}>
                                    <form className="create-nft-form col-8">
                                      <div className="upload-item mb-30">
                                        {newImages ? (
                                          isImagesUploaded ? (
                                            <p>
                                              Images Uploaded, Ready to Create
                                              Collection
                                            </p>
                                          ) : (
                                            <p>Images Uploading...</p>
                                          )
                                        ) : (
                                          <p>PNG,JPG,JPEG,SVG,WEBP</p>
                                        )}

                                        {newImages ? (
                                          <></>
                                        ) : (
                                          <div className="custom-upload">
                                            <div className="file-btn">
                                              <i className="icofont-upload-alt"></i>
                                              Add More Images
                                            </div>

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
                                        )}
                                      </div>
                                    </form>
                                  </div>
                                )}

                                <div
                                  className="tab-pane fade mentions-section show active mt-4"
                                  id="pills-mentions"
                                  role="tabpanel"
                                  aria-labelledby="pills-mentions-tab"
                                >
                                  <div className="row justify-content-center gx-3 gy-2">
                                    {collectionImages && !imageDeleting ? (
                                      collectionImages.map((img, i) => {
                                        return (
                                          <div
                                            className="col-lg-4 col-sm-6"
                                            key={i}
                                          >
                                            <div className="nft-item">
                                              <div className="nft-inner">
                                                <div className="nft-item-bottom text-end">
                                                  {editMode && (
                                                    <button
                                                      type="button"
                                                      className="btn btn-danger mb-3"
                                                      onClick={() =>
                                                        editImage(img.fileName)
                                                      }
                                                    >
                                                      Remove{" "}
                                                      <span>
                                                        <i className="icofont-trash"></i>
                                                      </span>
                                                    </button>
                                                  )}

                                                  <div
                                                    className="nft-thumb"
                                                    style={{
                                                      maxHeight: "400px",
                                                      overflow: "hidden",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                      let herfLink = `${img.url}`;
                                                      window.open(herfLink);
                                                    }}
                                                  >
                                                    <img
                                                      src={`${img.url}`}
                                                      style={{
                                                        objectFit: "cover",
                                                        objectPosition: "top",
                                                      }}
                                                      alt="nft-img"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <section className="section section-buy-nft">
                                        <h1 className="text--h1">
                                          Loading....
                                        </h1>
                                      </section>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <section className="page-header-section style-1 vh-100">
      <div className="container">
        <div className="page-header-content">
          <div className="page-header-inner">
            <div className="page-title">
              {activeAccountId ? (
                <>
                  <h2>Hold On Tight.</h2>
                  <ol className="breadcrumb">
                    <li className="active">Checking Access.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h2>Connect Wallet</h2>
                  <ol className="breadcrumb">
                    <li className="active">To access the collection</li>
                  </ol>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return accessError ? <Buy meta={metadata_id} /> : Element;
}
