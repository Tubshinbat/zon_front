"use client";
import { useRouter } from "next/navigation";

export default ({ title, back = false }) => {
  const router = useRouter();
  return (
    <>
      <div className="bread__background">
        <div className="container">
          <h4 className="bread__box">
            {back == true && (
              <div className="back_button" onClick={() => router.back()}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            )}
            {title && title}
          </h4>
        </div>
      </div>
    </>
  );
};
