export default ({ title, back }) => {
  return (
    <>
      <div className="bread__background">
        <div className="container">
          <h4>{title && title}</h4>
        </div>
      </div>
    </>
  );
};
