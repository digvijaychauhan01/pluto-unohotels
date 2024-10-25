import React from "react";
import { Card, CardImg, Col } from "reactstrap";
import Slider from "react-slick";

const hotelData = [
  {
    img: require("assets/img/brand/ashirbad.webp"),
    title: "Hotel Ashirbad",
  },
  {
    img: require("assets/img/brand/riverpine.png"),
    title: "Hotel Riverpine",
  },
  {
    img: require("assets/img/brand/alpine.jpg"),
    title: "Hotel Alpine",
  },
];

export default function HomeDestinationCard() {
  const arrowStyle = {
    background: "#000",
    borderRadius: "50%",
    height: "45px",
    width: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    cursor: "pointer",
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <div className="slick_pre" style={arrowStyle}></div>,
    nextArrow: <div style={arrowStyle}></div>,
  };

  return (
    <div className="container">
      <div className="pt-4 pb-4 text-center mx-auto">
        <h1 className="fw-black">Our Luxury Hotel Collections</h1>
        <p className="lead text-body-secondary">
          Business Hotels | Holiday Destinations | Destination Weddings |
          Honeymoon Destinations | Historic Sites
        </p>
      </div>

      <div className="mb-4">
        <Col className="mb-4">
          <Slider {...settings}>
            {hotelData.map((hotel, index) => (
              <Card className="border-0" key={index}>
                <div
                  className="hotel_card_each"
                  style={{ background: "#000", margin: "5px" }}
                >
                  <CardImg
                    alt={hotel.title}
                    src={hotel.img}
                    height={"300px"}
                    top
                  />
                  <blockquote className="card-blockquote">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-bg"
                      preserveAspectRatio="none"
                      viewBox="0 0 583 95"
                    >
                      <polygon
                        style={{ background: "#000" }}
                        points="0,52 583,95 0,95"
                      />
                      <polygon
                        style={{ background: "#000" }}
                        opacity=".2"
                        points="0,42 583,95 683,0 0,95"
                      />
                    </svg>
                    <h4 className="text-center display-4 font-weight-bold text-white">
                      {hotel.title}
                    </h4>
                  </blockquote>
                </div>
              </Card>
            ))}
          </Slider>
        </Col>
      </div>
    </div>
  );
}
