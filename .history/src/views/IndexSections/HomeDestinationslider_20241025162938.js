import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => (
  <div
    {...props}
    style={{
      background: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      height: "40px",
      width: "45px",
      left: "-30px",
      borderRadius: "5px",
      zIndex: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    }}
  >
    &#10094; {/* Left arrow symbol */}
  </div>
);

const NextArrow = (props) => (
  <div
    {...props}
    style={{
      background: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      height: "40px",
      width: "45px",
      right: "-30px",
      borderRadius: "5px",
      zIndex: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    }}
  >
    &#10095; {/* Right arrow symbol */}
  </div>
);

export default function HomeDestinationslider() {
  const images = [
    "data:image/jpeg;base64,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",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/another-hotel-image.jpg?w=500&h=500&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/yet-another-image.jpg?w=500&h=500&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/different-hotel-image.jpg?w=500&h=500&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/fifth-hotel-image.jpg?w=500&h=500&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/sixth-hotel-image.jpg?w=500&h=500&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/seventh-hotel-image.jpg?w=500&h=500&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/eighth-hotel-image.jpg?w=500&h=500&s=1",
  ];

  const titles = [
    "GOA",
    "DELHI",
    "AGRA",
    "KOLKATA",
    "GANGTOK",
    "AHMEDABAD",
    "DUBAI",
    "MALAYSIA",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card, index) => {
        if (index === next) {
          card.classList.add("center");
          card.classList.remove("side");
        } else {
          card.classList.remove("center");
          card.classList.add("side");
        }
      });
    },
  };

  return (
    <div className="container">
      <div className="pt-4 pb-4 text-center mx-auto">
        <h1 className="fw-black">Our Newest Hotels</h1>
        <p className="lead text-body-secondary">
          Dharamshala | Kashmir | Goa | Rajasthan
        </p>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <div className="card_cus side">
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "450px",
                    borderRadius: "10px",
                    margin: "10px",
                    position: "relative",
                  }}
                  className="business_card"
                >
                  <div
                    className="card-body_cus"
                    style={{
                      bottom: "0",
                      width: "100%",
                      textAlign: "center",
                      position: "absolute",
                      padding: "15px",
                      top: "0%",
                      alignContent: "end",
                      background:
                        "linear-gradient(-180deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,1) 100%)",
                    }}
                  >
                    <h5
                      className="card-title bg-black-500"
                      style={{ color: "#fff" }}
                    >
                      {titles[index]} {/* Use the title from the array */}
                    </h5>
                    <a
                      href="/"
                      style={{ background: "#000", border: "1px solid #fff" }}
                      className="btn btn-primary"
                    >
                      Know More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
