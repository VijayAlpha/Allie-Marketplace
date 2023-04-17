/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import axios from "axios";
import { Buy } from "./../../components/Buy";

export default function SingleCollection() {
  const [collectionData, setColllectionData] = useState();
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
                      <div
                        className="edit-photo custom-upload"
                        onClick={() => deleteCollection()}
                      >
                        <div className="file-btn">
                          <i className="icofont-trash"></i>
                          Delete
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
                <nav className="profile-nav">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {/* <button
                      className="nav-link active"
                      id="nav-allNft-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#allNft"
                      type="button"
                      role="tab"
                      aria-controls="allNft"
                      aria-selected="true"
                    >
                      Images
                    </button>
                    {/* <button
                      className="nav-link"
                      id="nav-about-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#about"
                      type="button"
                      role="tab"
                      aria-controls="about"
                      aria-selected="false"
                    >
                      About
                    </button> */}
                  </div>
                </nav>
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
                                <div
                                  className="tab-pane fade mentions-section show active"
                                  id="pills-mentions"
                                  role="tabpanel"
                                  aria-labelledby="pills-mentions-tab"
                                >
                                  <div className="row justify-content-center gx-3 gy-2">
                                    {collectionData ? (
                                      collectionData.files.map((img, i) => {
                                        return (
                                          <div
                                            className="col-lg-4 col-sm-6"
                                            key={i}
                                          >
                                            <div className="nft-item">
                                              <div className="nft-inner">
                                                <div className="nft-item-bottom">
                                                  <div
                                                    className="nft-thumb"
                                                    style={{
                                                      maxHeight: "400px",
                                                      overflow: "hidden",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                      let herfLink = `${img}`;
                                                      window.open(herfLink);
                                                    }}
                                                  >
                                                    <img
                                                      src={`${img}`}
                                                      style={{objectFit : "cover" , objectPosition:"top"}}
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
