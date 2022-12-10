import Link from "next/link";
import Image from "next/image";

export const MintbaseNFT = ({ nft , buttonName}) => {
    console.log(nft.media);
  return (
    <div className="collection">
      <div className="collection__left">
        <div className="right">
          <img
            src={nft.media ? (nft.media) : ( "/no-image.png")}
            alt="NFT image"
            className="collection__nft ma--bottom"
          />
          <h2 className="collection__name ma--bottom">{nft.title}</h2>
          <p className="collection__description ma--bottom text-base--1">
            {nft.description}
          </p>
        </div>
        <div className="left">
          <Link href={`/list/${nft.metadata_id}`}>
            <button className="btn collection__btn" id="btn-unlock-collection">
                {`${buttonName}`}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
