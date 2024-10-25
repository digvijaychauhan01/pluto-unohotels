import React from "react";
import { Card, CardImg, Col } from "reactstrap";
import Slider from "react-slick";

const hotelData = [
  {
    img: require("assets/img/brand/ashirbad.webp"),
    title: "Hotel Ashirbad Castle",
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
          {" "}
          {/* Add margin bottom to each Col */}
          <Slider {...settings}>
          <Card className="shadow-lg border-0">
            
              {hotelData.map((hotel, index) => (
                <div className="hotel_card_each" style={{ background: "#000" }} key={index}>
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
              ))}
            </Slider>
          </Card>
        </Col>
      </div>
    </div>
  );
}
