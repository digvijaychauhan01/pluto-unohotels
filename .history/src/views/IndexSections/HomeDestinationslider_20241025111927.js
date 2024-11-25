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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Example image URLs (you can replace these with your own)
  const imageUrls = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/vivanta-bhubaneswar-exterior.jpg?w=500&h=500&s=1",
    "https://riverpineresort.com/wp-content/uploads/2024/09/IMG_5003.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/vivanta-bhubaneswar-exterior.jpg?w=500&h=500&s=1",
    // Add more image URLs as needed
  ];

  const slides = [];
  for (let i = 0; i < imageUrls.length; i += 3) {
    slides.push(imageUrls.slice(i, i + 3));
  }

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
          {slides.map((slideImages, index) => (
            <div key={index} className="d-flex justify-content-between">
              {slideImages.map((url, imgIndex) => (
                <div key={imgIndex} className="card_cus">
                  <div
                    style={{
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "450px",
                      borderRadius: "10px",
                      margin: "10px",
                      position: "relative",
                      flex: "1",
                      maxWidth: "30%", // Control the width of each image
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
                        Card title
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
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
