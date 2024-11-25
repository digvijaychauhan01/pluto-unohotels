import React, { useState, useEffect } from "react";
import { Card, CardImg, Col, Button } from "reactstrap";
import Slider from "react-slick";
import axios from "axios";

// API URL
const API_URL = "https://backend.unohotelsandresorts.com/api/locations";

export default function HomeDestinationCard() {
  // State to store fetched hotel and destination data
  const [hotelData, setHotelData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Fetch hotel data from API
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(API_URL);
        setHotelData(response.data); // Set fetched data
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, []);

  // Function to open the gallery modal with a selected hotel
  const openGallery = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedImage(hotel.hotel_image); // Default to the first hotel image
    setIsGalleryOpen(true);
  };

  // Function to close the gallery modal
  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedImage(null);
    setSelectedHotel(null);
  };

  // Function to navigate to the next image in the gallery
  const nextImage = () => {
    const currentIndex = selectedHotel.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % selectedHotel.images.length;
    setSelectedImage(selectedHotel.images[nextIndex]);
  };

  // Function to navigate to the previous image in the gallery
  const prevImage = () => {
    const currentIndex = selectedHotel.images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + selectedHotel.images.length) % selectedHotel.images.length;
    setSelectedImage(selectedHotel.images[prevIndex]);
  };

  return (
    <div className="container">
      <div className="pt-4 pb-4 text-center mx-auto">
        <h1 className="text-3xl font-bold mt-10">Our Luxury Hotel Collections</h1>
        <p className="lead text-body-secondary">
          Business Hotels | Holiday Destinations | Destination Weddings |
          Honeymoon Destinations | Historic Sites
        </p>
      </div>

      <div className="mb-4">
        <Col className="mb-4">
          {/* Main slider for hotel cards */}
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            arrows={false}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  dots: true,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
                },
              },
            ]}
          >
            {hotelData.map((country, index) => (
              country.destinations.map((destination) => (
                destination.hotels.map((hotel) => (
                  <div key={hotel.id}>
                    <Card className="border-0">
                      <div
                        className="hotel_card_each"
                        style={{
                          background: "#000",
                          margin: "5px",
                          position: "relative",
                          borderRadius: "10px",
                        }}
                      >
                        {/* Show the first image of the hotel */}
                        <div
                          className="d-inline-block"
                          style={{
                            position: "relative",
                            borderRadius: "10px",
                            width: '100%'
                          }}
                        >
                          <CardImg
                            alt={hotel.hotel_name}
                            src={`https://backend.unohotelsandresorts.com/${hotel.hotel_image}`}
                            height={"300px"}
                            top
                            style={{
                              pointerEvents: "none", // Disable pointer events on the image
                              width: "100%",
                              borderRadius: "5px",
                              objectFit: "cover",
                              height:"300px"
                            }}
                          />
                          {/* "Open Gallery" small button positioned on the right side of the image */}
                          <Button
                            color="primary"
                            onClick={() => openGallery(hotel)}
                            style={{
                              position: "absolute",
                              top: "10px", // Adjust for desired vertical positioning
                              right: "10px", // Positioned at the top right corner
                              fontSize: "12px", // Smaller button
                              padding: "5px 10px",
                              borderRadius: "20px",
                              backgroundColor: "transparent", // Transparent background
                              border: "2px solid #fff", // White border
                              color: "#fff", // White text color
                            }}
                          >
                            Open Gallery
                          </Button>
                        </div>

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
                          <h4 className="text-center display-5 font-weight-bold text-white">
                            {hotel.hotel_name}
                            <p className="font-weight-light text-white">
                              (By UNO Hotels - {destination.destination_name})
                            </p>
                          </h4>
                        </blockquote>
                      </div>
                    </Card>
                  </div>
                ))
              ))
            ))}
          </Slider>
        </Col>
      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && selectedHotel && (
        <div
          className="modal d-block position-fixed top-0 start-0 end-0 bottom-0"
          tabIndex="-1"
          role="dialog"
          style={{
            backdropFilter: "blur(5px)", // Apply blur effect to the background
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for modal overlay
            zIndex: 1050, // Ensure the modal appears above other content
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              {/* Modal Body with selected image */}
              <div
                className="modal-body"
                style={{
                  padding: "0",
                  position: "relative", // Make the body a relative container for positioning buttons
                }}
              >
                <img
                  src={`https://backend.unohotelsandresorts.com/${selectedImage}`}
                  alt="Gallery"
                  className="img-fluid d-block mx-auto"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                    height: "60vh",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Prev and Next buttons */}
                <button
                  type="button"
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                  onClick={prevImage}
                  style={{
                    fontSize: "18px",
                    padding: "8px",
                    bottom: "42%",
                    zIndex: 1060,
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for better visibility
                    borderRadius: "50%",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  &#x2190;
                </button>
                <button
                  type="button"
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                  onClick={nextImage}
                  style={{
                    fontSize: "18px",
                    padding: "8px",
                    right: "-9px",
                    bottom: "42%",
                    zIndex: 1060,
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for better visibility
                    borderRadius: "50%",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  &#x2192;
                </button>

                {/* Close (X) button */}
                <button
                  type="button"
                  className="btn btn-light position-absolute top-0 end-0 translate-middle-x"
                  onClick={closeGallery}
                  style={{
                    fontSize: "15px",
                    padding: "0px 9px",
                    margin: "5px",
                    zIndex: 1060,
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for better visibility
                    borderRadius: "50%",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
