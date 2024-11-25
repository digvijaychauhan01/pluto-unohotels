import React, { useState } from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Slider from "react-slick"; // Import Slick Slider for image gallery
import "slick-carousel/slick/slick.css"; // Slick Slider styles
import "slick-carousel/slick/slick-theme.css"; // Slick Slider theme
import DemoNavbar from 'components/Navbars/DemoNavbar'; // Navbar component
import Footer from './Footer'; // Footer component
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Custom arrow icons

// Hotel data (with your custom images)
const hotelData = [
    {
        images: [
            require("assets/img/gallery/castle1.jpg"),
            require("assets/img/gallery/castle2.jpg"),
            require("assets/img/gallery/castle3.jpg"),
            require("assets/img/gallery/castle4.jpg"),
            require("assets/img/gallery/castle5.jpg"),
            require("assets/img/gallery/castle6.jpg"),
            require("assets/img/gallery/castle7.jpg"),
            require("assets/img/gallery/castle8.jpg"),
            require("assets/img/gallery/castle9.jpg"),
        ],
        title: "The Ashirwad Castle",
        location: "Shimla",
    },
    {
        images: [
            require("assets/img/brand/riverpine.png"),
            require("assets/img/brand/revirpine1.jpg"),
            require("assets/img/brand/revirpine2.jpeg"),
            require("assets/img/brand/revirpine3.jpg"),
            require("assets/img/brand/revirpine4.jpg"),
        ],
        title: "Revir Pine Resort",
        location: "Manali",
    },
    {
        images: [
            require("assets/img/brand/alpine.jpg"),
            require("assets/img/brand/alpine1.jpg"),
            require("assets/img/brand/alpine2.jpg"),
            require("assets/img/brand/alpine3.jpg"),
            require("assets/img/brand/alpine4.jpg"),
        ],
        title: "Alpine & Villa",
        location: "Dharamshala",
    },
    {
        images: [
            require("assets/img/brand/grand.jpeg"),
            require("assets/img/gallery/hill.jpeg"),
            require("assets/img/gallery/hill1.jpeg"),
            require("assets/img/gallery/hill2.jpeg"),
            require("assets/img/gallery/hill3.jpeg"),
            require("assets/img/gallery/hill4.jpeg"),
            require("assets/img/gallery/hill5.jpeg"),

        ],
        title: "Grand Hill",
        location: "Dalhousie",
    },
    // {
    //     images: [
    //         require("assets/img/gallery/tejas.jpg"),
    //         require("assets/img/gallery/tejas1.jpg"),
    //         require("assets/img/gallery/tejas2.jpg"),
    //         require("assets/img/gallery/tejas3.jpg"),
    //         require("assets/img/gallery/tejas4.jpg"),
    //         require("assets/img/gallery/tejas5.jpg"),
    //         require("assets/img/gallery/tejas6.jpg"),
    //     ],
    //     title: "Tejas",
    //     location: "Shaleen Rd, Gadherni",
    // },
    {
        images: [
            require("assets/img/gallery/exot.jpeg"),
            require("assets/img/gallery/exotica1.jpg"),
            require("assets/img/gallery/exotica2.jpg"),
            require("assets/img/gallery/exotica3.jpg"),
            require("assets/img/gallery/exotica4.jpg"),
            require("assets/img/gallery/exotica5.jpg"),
            require("assets/img/gallery/exotica6.jpg"),

        ],
        title: "Exotica Heights",
        location: "McLeod Ganj",
    },
    {
        images: [
            require("assets/img/gallery/cozy.jpg"),
            require("assets/img/gallery/cozy1.jpg"),
            require("assets/img/gallery/cozy2.jpg"),
            require("assets/img/gallery/cozy3.jpg"),
            require("assets/img/gallery/cozy4.jpg"),
            require("assets/img/gallery/cozy5.jpg"),
            require("assets/img/gallery/cozy6.jpg"),
            require("assets/img/gallery/cozy7.jpg"),
        ],
        title: "Cozy Nook",
        location: " Dalhousie - Chamba Rd",
    },
    {
        images: [
            require("assets/img/gallery/hydrangea.jpeg"),
            require("assets/img/gallery/hydrangea1.jpeg"),
            require("assets/img/gallery/hydrangea2.jpeg"),
            require("assets/img/gallery/hydrangea3.jpg"),
            require("assets/img/gallery/hydrangea4.jpeg"),
            require("assets/img/gallery/hydrangea5.jpeg"),
            require("assets/img/gallery/hydrangea6.jpg"),
            require("assets/img/gallery/hydrangea7.jpg"),

        ],
        title: "Hydrangea Heights",
        location: "Shimla",
    },
];
const Gallery = () => {
    // Slider settings for the hotel gallery (no autoplay to allow manual control)
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false, // Disable autoplay
        arrows: true, // Enable arrows
        prevArrow: (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "0px", // Position it on the left side
              transform: "translateY(-50%)",
              zIndex: 1,
              cursor: "pointer",
            }}
          >
            <FaChevronLeft size={20} color="black" />
          </div>
        ),
        nextArrow: (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "0px", // Position it on the right side
              transform: "translateY(-50%)",
              zIndex: 1,
              cursor: "pointer",
            }}
          >
            <FaChevronRight size={20} color="black" />
          </div>
        ),
      };

    // State to track if the gallery modal is open
    const [openGallery, setOpenGallery] = useState(null);
    const [currentImage, setCurrentImage] = useState(null); // State to track selected image for larger view

    // Function to open the gallery for a specific hotel
    const openHotelGallery = (hotelId) => {
        setOpenGallery(hotelId);
        setCurrentImage(null); // Reset to first image when opening the modal
    };

    // Function to close the gallery
    const closeHotelGallery = () => {
        setOpenGallery(null);
    };

    // Find the selected hotel using openGallery ID
    const selectedHotel = hotelData.find((hotel, index) => index === openGallery);

    return (
        <>
            <DemoNavbar /> {/* Navbar component */}
            <Container className="py-5 mt-4">
                <Row>
                    {hotelData.map((hotel, index) => (
                        <Col key={index} lg="4" sm="12" className="mb-4">
                            <Card className="shadow-lg rounded overflow-hidden border-0" style={{ transition: "transform 0.3s ease-in-out" }}>
                                {/* Card Image at the top */}
                                <CardImg
                                    top
                                    width="100%"
                                    src={hotel.images[0]} // Use the first image as the preview image
                                    alt={`${hotel.title} Image`}
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "8px", // Rounded corners
                                        height: "250px", // Uniform height for images
                                    }}
                                />
                                <CardBody className="p-4">
                                    {/* Hotel Info */}
                                    <CardTitle tag="h5" className="font-weight-bold">{hotel.title}</CardTitle>
                                    <CardText className="font-weight-bold">{hotel.location}</CardText>
                                    {/* View Gallery Button */}
                                    <Button
                                        size="md"
                                        onClick={() => openHotelGallery(index)} // Pass the index of the hotel
                                        className="font-weight-bold"
                                        style={{
                                            backgroundColor: "white", // Custom color
                                            transition: "background-color 0.3s ease",
                                            colorr: "black", // Custom color
                                        }}
                                    >
                                        View Gallery
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            {/* Gallery Modal */}
            <Modal isOpen={openGallery !== null} toggle={closeHotelGallery}>
                {/* Modal Header with Hotel Name */}
                <ModalHeader toggle={closeHotelGallery}>
                    {selectedHotel ? `${selectedHotel.title} - Gallery` : "Hotel Gallery"}
                </ModalHeader>
                <ModalBody>
                    {/* Ensure the hotel exists before rendering the gallery */}
                    {selectedHotel ? (
                        <Slider {...sliderSettings}>
                            {selectedHotel.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`Hotel Image ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            borderRadius: "8px", // Rounded corners for images
                                            height: "400px", // Set a fixed height for the images
                                            objectFit: "cover", // Ensures images fill the space while maintaining aspect ratio
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p>Gallery not available.</p>
                    )}
                </ModalBody>
            </Modal>
            <Footer /> {/* Footer component */}
        </>
    );
};

export default Gallery;
