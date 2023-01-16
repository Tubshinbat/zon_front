import base from "lib/base";

const Gallerys = ({ gallerys }) => {
  return (
    <>
      <div className="gallerys">
        {gallerys &&
          gallerys.map((gallery) => (
            <div className="gallery" data-aos="fade-up" data-aos-duration={800}>
              <img src={`${base.cdnUrl}/450/${gallery.picture}`} />
            </div>
          ))}
      </div>
    </>
  );
};
export default Gallerys;
