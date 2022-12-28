export const MediaCollection = ({ img }) => {
  return (
    <div className="media__box">
      <img className="media__img" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`} alt="media images" />
    </div>
  );
};
