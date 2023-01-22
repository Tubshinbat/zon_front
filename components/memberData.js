"use client";
import base from "lib/base";
import QRCode from "react-qr-code";
import Bread from "components/bread";
import { getMember } from "lib/member";

export default async ({ memberId }) => {
  const { member } = await getMember(memberId);
  return (
    <>
      <Bread
        title={member && member.lastName + " " + member.firstName}
        back={true}
      />
      <div className="seaction-top">
        <div className="container">
          <div className="page__content">
            <div className="row">
              <div className="col-lg-3">
                <div className="member__data">
                  <div className="member_img">
                    <img src={`${base.cdnUrl}/${member.pictures[0]}`} />
                  </div>
                  <div className="member_name_box">
                    <p>
                      {member.lastName} <b> {member.firstName}</b>
                    </p>
                    <p className="member_position"> {member.position} </p>
                    <div className="member_role">
                      {member.status === true && "Жинхэнэ гишүүн"}
                    </div>
                  </div>
                  <div className="member_qr">
                    <p>QR кодыг уншуулан гишүүнтэй холбогдоно уу</p>
                    <div className="qr__box">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={member.phoneNumber.toString()}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="member__about">
                  <div className="member__about_box">
                    <div className="about__box">
                      <p>Үйлчлүүлэгчийн тоо</p>
                      <h4> {member.customerCount} </h4>
                    </div>
                    <div className="about__box">
                      <p>Оролцооны үнэлгээ</p>
                      <h4> {member.rate}%</h4>
                    </div>
                    <div className="about__box">
                      <p>Байгууллагад харъяалагддаг:</p>
                      <h4> {member.belong}</h4>
                    </div>
                  </div>
                  <div className="member__short_about">
                    <p className="member__fullname">
                      {member.lastName} <b> {member.firstName}</b>
                    </p>
                    <p>{member.shortAbout}</p>
                    <h3>Танилцуулга</h3>
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: member.about,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
