import Link from "next/link";

const Faqs = ({ faqs }) => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section__title">
            <h2>Санал хүсэлт</h2>
            <div className="all__more">
              <Link href="/faq"> Бүх санал хүсэлтийг харах</Link>
            </div>
          </div>
          <div className="faq__list row">
            {faqs.map((faq) => (
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div
                  className="faq__item"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <h2> " </h2>
                  <p>
                    {faq.question.length > 190
                      ? faq.question.substr(0, 190) + "..."
                      : faq.question}
                  </p>
                  <div className="faq__box_footer">
                    <Link href={`/faq/${faq._id}`}> Дэлгэрэнгүй </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
