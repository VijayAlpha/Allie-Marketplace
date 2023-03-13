import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import axios from "axios";
import { Buy } from "./../../components/Buy";

export default function SingleCollection() {
  const [collectionData, setColllectionData] = useState();
  const [accessError, setError] = useState();
  const [userName, setUsername] = useState();
  const [wallet, setWallet] = useState();

  const router = useRouter();
  const metadata_id = router.query.metadata_id;
  const { activeAccountId } = useWallet();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        console.log(activeAccountId);
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
        console.log(error);
      }
    };
    if (activeAccountId) {
      checkAccess();
    }
  }, [activeAccountId]);

  const deleteCollection = async () => {
    try {
      const signerRes = await wallet.signMessage("test-message");

      const res = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/${metadata_id}`,
        data: {
          signerRes,
        },
      });

      if (res) {
        window.location.href = "/";
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
                <div className="profile-cover">
                  <img
                    src="../assets/images/profile/cover.jpg"
                    alt="cover-pic"
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
                        {/* <input type="file" /> */}
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
                    <h4 style={{ textAlign: "left" }}>{collectionData.name}</h4>
                    <p>{collectionData.description}</p>
                  </div>
                </div>
              </div>
              <div className="profile-details">
                <nav className="profile-nav">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
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
                    <button
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
                    </button>
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
                                                  <div className="nft-thumb">
                                                    <img
                                                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
                                                      alt="nft-img"
                                                      style={{
                                                        height: "280px",
                                                      }}
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
              <h2>Checking Access </h2>
            </div>
            <ol className="breadcrumb">
              <li className="active">Please Wait...</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );

  return accessError ? <Buy meta={metadata_id} /> : Element;
}
