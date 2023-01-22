"use client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

export default ({ webInfo }) => {
  return (
    <div className="seaction-top">
      <div className="container">
        <div className="page__content contact-page">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-box">
                <div className="contact_item">
                  <div className="contact_item_img_box">
                    <img src="/images/world.png" />
                  </div>
                  <a href={webInfo.name}> {webInfo.name}</a>
                </div>
                <div className="contact_item">
                  <div className="contact_item_img_box">
                    <img src="/images/email.png" />
                  </div>
                  <a href={`mailto:${webInfo.email}`}> {webInfo.email}</a>
                </div>
                <div className="contact_item">
                  <div className="contact_item_img_box">
                    <img src="/images/phone.png" />
                  </div>
                  <a href={`callto:${webInfo.phone}`}> {webInfo.phone}</a>
                </div>
                <div className="contact_item">
                  <div className="contact_item_img_box">
                    <img src="/images/call-center.png" />
                  </div>
                  <a href={`callto:98118814`}> +976 9811 8814</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                style={{
                  height: "400px",
                  width: "100%",
                  padding: "10px",
                  boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
                }}
              >
                <Wrapper apiKey={"AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw"}>
                  <Map
                    latitude={47.91599393612535}
                    longitude={106.89541829162692}
                  ></Map>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

const Map = ({ latitude, longitude, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(google.maps.Maps || null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          center: {
            lat: latitude ?? 0,
            lng: longitude ?? 0,
          },
          zoom: 13,
        })
      );
    }
  }, [ref, map, latitude, longitude]);

  const marker = new google.maps.Marker({
    position: { lat: 47.90908379160444, lng: 106.93018540578689 },
    map: map,
  });

  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
    </>
  );
};
