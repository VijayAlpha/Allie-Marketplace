import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import { NFTCard } from "../../components/NFTCard";
import fetchGraphQL from "../../packages/FetchGraphQL";

const CreateCollection = () => {
  const [nftData, setNftData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { activeAccountId } = useWallet();

  async function fetchCheckNFT() {
    let nft_contract_id = process.env.NEXT_PUBLIC_CONTRACT_ID;

    const operations = (nft_contract_id) => {
      return `
      query MyQuery {
        mb_views_active_listings(
          where: {nft_contract_id: {_eq: "${nft_contract_id}"}}
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

    const { errors, data } = await fetchGraphQL(
      operations(nft_contract_id),
      "MyQuery",
      {}
    );

    setNftData(data.mb_views_active_listings);
    setIsLoading(false);
  }

  useEffect(() => {
    function redirectUser() {
      if (activeAccountId !== process.env.NEXT_PUBLIC_OWNER) {
        window.location.href = "/";
      }
    }
    redirectUser();
    fetchCheckNFT();
  });

  return (
    <>
      <section className="page-header-section style-1">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Create Collections</h2>
              </div>
              <ol className="breadcrumb">
                <li className="active">
                  Select Listed NFTs to Create Collection
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-section padding-top padding-bottom min-vh-100">
        <div className="container">
          <div className="section-wrapper">
            <div className="explore-wrapper">
              <div className="row justify-content-start gx-4 gy-3">
                {isLoading === true ? (
                  <h2>Loading...</h2>
                ) : nftData.length === 0 ? (
                  <h2>Sorry!... No NFTs Listed Now</h2>
                ) : (
                  nftData.map((data, id) => {
                    return <NFTCard post={data} page={"create"} key={id} />;
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateCollection;
