import Link from "next/link";


export const Collection = ({ post }) => {
  console.log(post);
  return (
    <div className="collection">
      <div className="collection__left">
        <div className="right">
          <img
            src={post.nftImage}
            alt="NFT image"
            className="collection__nft ma--bottom"
          />
          <h2 className="collection__name ma--bottom">{post.name}</h2>
          <p className="collection__description ma--bottom text-base--1">
            {post.description}
          </p>
          <span className="collection__price text--h2 ma--bottom">
            {post.price}
            <img
              src="https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=023"
              alt="NEAR"
              className="collection__price--img"
            />
          </span>
        </div>
        <div className="left">
          <Link href={`/collection/${post.metadata_id}`}>
            <button className="btn collection__btn" id="btn-unlock-collection">
              Unlock Collection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
