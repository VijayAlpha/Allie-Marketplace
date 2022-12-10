import  { Image } from "next";

export const MediaCollection = ({ img }) => {
  return (
    <div className="media__box">
      <Image className="media__img" src={img} alt="media images" />
    </div>
  );
};
