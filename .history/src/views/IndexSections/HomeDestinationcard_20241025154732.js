import React from "react";
import { Card, CardImg, Col } from "reactstrap";
import Slider from "react-slick";

const sliderImages = [
  require("assets/img/brand/ashirbad.webp"),
  require("assets/img/brand/riverpine.png"),
  require("assets/img/brand/alpine.jpg")
];

export default function HomeDestinationCard() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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

      <div className="mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {sliderImages.map((image, index) => (
          <Col key={index}>
            <Card
              style={{
                background: "#000",
              }}
              className="shadow-lg border-0"
            >
              <Slider {...settings}>
                <div>
                  <CardImg
                    alt="..."
                    src={image}
                    height={"300px"}
                    top
                  />
                </div>
                {/* You can add more slides here if needed */}
              </Slider>
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
                  Hotel Ashirdwad Castle
                </h4>
              </blockquote>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
}
