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
    "https://media.istockphoto.com/id/477417246/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=rRH-ASxJjZzdORnUeT294mbeqgiq7LIBuGJ5HVboNqA=",
    "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
    "https://cdn.britannica.com/25/155325-050-79CFFB62/Taj-Mahal-Agra-India.jpg",
    "https://media.assettype.com/outlooktraveller%2F2024-01%2Fa369e7e3-f7c8-4210-ae58-1800ea5cb2ea%2FKolkata1.jpg",
    "https://www.esikkimtourism.in/wp-content/uploads/2019/04/plcstovsrtaugst.jpg",
    "https://media.ahmedabadmirror.com/am/uploads/mediaGallery/image/1658653042367.jpg-org",
    "https://viagea.it/wp-content/uploads/2023/05/Cose-da-fare-a-Dubai.png",
    "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/03/19183130/kuala-lumpur-feature-image-1600x900.jpeg",
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
                      style={{ background: "#fff", color:"#000", border: "1px solid #fff" }}
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
