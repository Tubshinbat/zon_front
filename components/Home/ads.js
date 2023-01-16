import base from "lib/base";

const HomeAds = ({ homeAds }) => {
  return (
    <div className="container">
      {homeAds && homeAds[0] && (
        <div className="home__ads">
          <a href={homeAds[0].link} target="_blank">
            <div className="home__ads_item">
              <img
                src={`${base.cdnUrl}/${homeAds[0].picture}`}
                className="home__ads_small"
              />
              {homeAds[0].bigPicture && (
                <img
                  src={`${base.cdnUrl}/${homeAds[0].bigPicture}`}
                  className="home__ads_big"
                />
              )}
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default HomeAds;
