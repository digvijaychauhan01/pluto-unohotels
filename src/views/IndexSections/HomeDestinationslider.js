import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modals from "./Modals";

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
  const [destinations, setDestinations] = useState([]); // State to store destinations data
  const [loading, setLoading] = useState(true); // State for loading state

  // Fetch destination data from API
  const fetchDestinations = async () => {
    try {
      const response = await fetch("https://backend.unohotelsandresorts.com/api/locations");
      if (!response.ok) {
        throw new Error("Failed to fetch destinations data");
      }
      const data = await response.json();
      setDestinations(data[0].destinations); // Set destinations state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []); // Fetch destinations when the component mounts

  // Slider settings
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
    ],
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="pt-4 pb-4 text-center mx-auto">
        <h1 className="text-3xl font-bold mt-10 ">Our Newest Hotels</h1>
        <p className="lead text-body-secondary">Our Upcoming Newest Hotels Destinations</p>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {destinations.map((destination, index) => (
            <div key={index}>
              <div className="card_cus side">
                <div
                  style={{
                    backgroundImage: `url(https://backend.unohotelsandresorts.com/${destination.destination_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "350px",
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
                      borderRadius: "10px",
                      background:
                        "linear-gradient(-180deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,1) 100%)",
                    }}
                  >
                    <h5 className="card-title bg-black-500" style={{ color: "#fff" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          borderRadius: "5px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                        }}
                        className="bg-red p-1 mb-2"
                      >
                        Upcoming Hotel Destination
                      </span>
                      <br />
                      {destination.destination_name} {/* Display destination name */}
                    </h5>

                    <Modals />
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
