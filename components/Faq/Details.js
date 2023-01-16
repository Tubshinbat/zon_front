"use client";
import { useRouter } from "next/navigation";

const FaqDetails = ({ faq }) => {
  const router = useRouter();

  return (
    <>
      <div className="faq__content">
        <div className="faq__details">
          <div className="faq__question">
            <h6 className="faq__sub__title"> Асуулт </h6>
            <p>{faq.question}</p>
          </div>
          <div className="faq__answer">
            <h6 className="faq__sub__title"> Хариулт </h6>
            <p> {faq.answer}</p>
          </div>
          <div className="back__button_box">
            <button onClick={() => router.back()}> Буцах </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqDetails;
