/* eslint-disable @next/next/no-img-element */
import { useWallet } from "@mintbase-js/react";
import { execute, mint } from "@mintbase-js/sdk";
import { uploadReference } from "@mintbase-js/storage";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Mint = () => {
  const router = useRouter();
  const [nftTitle, setNftTitle] = useState();
  const [nftDescription, setNftDescription] = useState();
  const [nftImage, setNftImage] = useState();
  const [nftAmount, setNftAmount] = useState();
  const [isLoading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { selector, activeAccountId, isConnected } = useWallet();

  const nftImageUpload = (e) => {
    setNftImage(e.currentTarget.files[0]);
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nftImage) return;

    setLoading(true);

    const metadata = {
      title: nftTitle,
      description: nftDescription,
      media: nftImage,
    };

    const uploadResult = await uploadReference(metadata);

    setLoading(false);

    handleMintToken(uploadResult.id);
  };

  const handleMintToken = async (reference) => {
    if (!activeAccountId) return;

    const currentUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const apiUrl = `${currentUrl}/list`;

    const wallet = await selector.wallet();

    execute(
      {
        wallet,
        callbackUrl: `${apiUrl}`,
      },
      mint({
        ownerId: activeAccountId,
        metadata: { reference: reference },
        noMedia: true,
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ID,
        amount: parseInt(nftAmount),
      })
    );
  };

  return (
    <>
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Mint Page</h2>
              </div>
              <ol className="breadcrumb">
                <li>
                  <Link href="/">Mint</Link>
                </li>
                <li className="active">NFT</li>
              </ol>
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
              <form className="create-nft-form col-8" onSubmit={handleSubmit}>
                <div className="upload-item mb-30">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      style={{
                        marginBottom: "1.5rem",
                        borderRadius: "10px",
                        width: "400px",
                      }}
                      alt="Preview"
                    />
                  )}

                  {nftImage ? (
                    <p>Image Uploaded</p>
                  ) : (
                    <p>
                      Accepted Formats: image/png, image/jpeg, image/gif,
                      image/svg+xml | Ideal dimension: 1:1 | Max size: 5mb
                    </p>
                  )}

                  <div className="custom-upload">
                    <div className="file-btn">
                      <i className="icofont-upload-alt"></i>
                      Upload a Image || Image must be 1:1 ratio
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={nftImageUpload}
                    />
                  </div>
                </div>
                <div className="form-floating item-name-field mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="itemNameInput"
                    placeholder="Item Name"
                    onChange={(e) => {
                      setNftTitle(e.currentTarget.value);
                    }}
                  />
                  <label htmlFor="itemNameInput">NFT Name</label>
                </div>
                <div className="form-floating item-desc-field mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Item Description"
                    id="itemDesc"
                    onChange={(e) => {
                      setNftDescription(e.currentTarget.value);
                    }}
                  ></textarea>
                  <label htmlFor="itemDesc">NFT Description</label>
                </div>
                <div className="form-floating item-name-field mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="itemNameInput"
                    placeholder="Item Name"
                    min="1"
                    max="100"
                    onChange={(e) => {
                      setNftAmount(e.currentTarget.value);
                    }}
                  />
                  <label htmlFor="itemNameInput">Number of Copies</label>
                </div>

                {isLoading ? (
                  <div className="submit-btn-field text-center">
                    <button type="disable">Minting...</button>
                  </div>
                ) : (
                  <div className="submit-btn-field text-center">
                    <button type="submit">Mint NFT</button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mint;
