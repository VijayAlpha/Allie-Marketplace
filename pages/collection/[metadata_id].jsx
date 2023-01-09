import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Wallet, Chain, Network } from "mintbase";
import axios from "axios";
import { Buy } from "../../components/Buy";

export default function SingleCollection() {
  const [collectionData, setColllectionData] = useState();
  const [accessError, setError] = useState();
  const [userName, setUsername] = useState();
  const [wallet, setWallet] = useState();

  const router = useRouter();
  const metadata_id = router.query.metadata_id;

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data, error } = await new Wallet().init({
          networkName: Network.testnet,
          chain: Chain.near,
          apiKey: process.env.NEXT_PUBLIC_MINTBASE_API,
        });
        const { wallet, isConnected } = data;

        setWallet(wallet);

        if (isConnected) {
          const { data: details } = await wallet.details();
          setUsername(details.accountId);
        }

        const signerRes = await wallet.signMessage("test-message");

        const res = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collection/${metadata_id}`,
          data: {
            metadata_id,
            signerRes,
          },
        });
        console.log(res.data);
        setColllectionData(res.data.collection);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    checkAccess();
  }, [metadata_id]);

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

  const accessPage = accessError ? (
    <Buy meta={metadata_id} />
  ) : (
    <section className="page-header-section style-1 vh-100">
      <div className="container">
        <div className="page-header-content">
          <div className="page-header-inner">
            <div className="page-title">
              <h2>Checking Access </h2>
            </div>
            <ol className="breadcrumb">
              <li>
                <a href="index.html">Please</a>
              </li>
              <li className="active">wait</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
  const element = collectionData ? (
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

                  {/* <div className="tab-pane fade" id="about" role="tabpanel" aria-labelledby="nav-about-tab">
                                <div>
                                    <div className="row">
                                        <div className="col-xl-9">
                                            <article>

                                                <div className="info-card mb-3">
                                                    <div className="info-card-title">
                                                        <h4>About</h4>
                                                    </div>
                                                    <div className="info-card-content">
                                                        <p>Collaboratively innovate compelling mindshare after
                                                            prospective partnerships Competently sereiz long-term
                                                            high-impact internal or  sources via user friendly
                                                            strategic themesr areas creat Dramatically coordinate
                                                            premium partnerships rather than standards compliant
                                                            technologies ernd Dramatically matrix ethical collaboration
                                                            and idea-sharing through opensource methodologies and
                                                            Intrinsicly grow collaborative platforms vis-a-vis effective
                                                            scenarios. Energistically strategize cost effective ideas
                                                            before the worke unde.</p>
                                                    </div>
                                                </div>
                                                <div className="info-card">
                                                    <div className="info-card-title">
                                                        <h4>Other Info</h4>
                                                    </div>
                                                    <div className="info-card-content">
                                                        <ul className="info-list">
                                                            <li>
                                                                <p className="info-name">Name</p>
                                                                <p className="info-details">Alex Joe</p>
                                                            </li>
                                                            <li>
                                                                <p className="info-name">Country</p>
                                                                <p className="info-details">USA</p>
                                                            </li>
                                                            <li>
                                                                <p className="info-name">Specialize in</p>
                                                                <p className="info-details">Art</p>
                                                            </li>
                                                            <li>
                                                                <p className="info-name">Wallet Add</p>
                                                                <p className="info-details">fdffx1xr394k..dfdk23sl</p>
                                                            </li>
                                                            <li>
                                                                <p className="info-name">Age</p>
                                                                <p className="info-details">36</p>
                                                            </li>
                                                            <li>
                                                                <p className="info-name">Date of Birth</p>
                                                                <p className="info-details">27-02-1996</p>
                                                            </li>
                                                            <li>
                                                                <p className="info-name">Address</p>
                                                                <p className="info-details">Streop Rd, Peosur, Inphodux,
                                                                    USA.</p>
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <header className="header">
        <div className="">
          <img
            src={collectionData.nftImage}
            className="collection__nft"
            alt="NFT image"
          />
        </div>

        <div className="header__right">
          <h2 className="collection__name ma--bottom">{collectionData.name}</h2>
          <p className="collection__description ma--bottom text-base--1">
            {collectionData.description}
          </p>
          <span className="collection__price text--h2">
            {Math.round(
              collectionData.price.toLocaleString("fullwide", {
                useGrouping: false,
              }) *
                10 ** -24
            )}{" "}
            NEAR
          </span>
          {userName === process.env.NEXT_PUBLIC_OWNER ? (
            <>
              <button className="btn btn--primary text-base--1 ma--lg btn__disable">
                Edit Collection
              </button>

              <button
                className="btn btn--primary text-base--1 ma--lg btn__red"
                onClick={() => deleteCollection()}
              >
                Delete
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>

      <section className="section section-media">
        <div className="media">
          {collectionData ? (
            collectionData.files.map((img, i) => {
              return <MediaCollection img={img} key={i} />;
            })
          ) : (
            <section className="section section-buy-nft">
              <h1 className="text--h1">Loading....</h1>
            </section>
          )}
        </div>
      </section> */}
    </>
  ) : (
    accessPage
  );
  return element;
}
