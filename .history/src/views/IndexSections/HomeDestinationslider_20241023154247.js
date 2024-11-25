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
  var settings = {
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
          {Array(8)
            .fill()
            .map((_, index) => (
              <div key={index}>
                <div className="card_cus side">
                  <div
                    style={{
                      backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/vivanta-bhubaneswar-exterior.jpg?w=500&h=500&s=1)`,
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
                        position: "absolute;
  padding: 15px;
                      }}
                    >
                      <h5 className="card-title bg-black-500">Card title</h5>
                      <a href="#" className="btn btn-primary">
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
