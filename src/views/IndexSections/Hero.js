import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import Search from "./Search"; // Import your Search form
import styles from './Search.module.css'; // Import styles for layout

// Hotel data with images
const SliderImage = [
  {
    images: [
      require("assets/img/brand/riverpine.png"),
      require("assets/img/gallery/hydrangea.jpeg"),
      require("assets/img/gallery/exot.jpeg"),
    ]
  },
  // You can add more hotels and images here if needed
];

const Hero = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle form visibility
  const [currentIndex, setCurrentIndex] = useState(0); // State for the current image index
  const images = SliderImage[0].images; // Dynamically set images from SliderImage

  const formRef = useRef(null); // Reference to the form element

  // Toggle the visibility of the search form
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Close the form if the user clicks outside
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsSearchVisible(false); // Hide the form
    }
  };

  // Change the image index every 8 seconds (auto slide)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  // Go to previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Go to next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="position-relative">
      <section
        style={{
          backgroundImage: `url(${images[currentIndex]})`, // Dynamically set background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure full height section
        }}
        className="section section-hero section-shaped"
      >
        <Container className="shape-container d-flex align-items-center py-lg">
          <div className="col px-0">
            <Row className="align-items-center justify-content-center">
              <Col className="text-center" lg="6">
                {/* <p className="lead text-white">Welcome to Riverpine!</p> */}
              </Col>
            </Row>
          </div>
        </Container>

        {/* Conditionally show Search Form on desktop, toggle visibility on mobile */}
        <div
          ref={formRef} // Assign the ref to the search form container
          className={`${styles.searchForm} ${isSearchVisible ? styles.visible : ''}`}
        >
          <Search />
        </div>
      </section>

      {/* Floating Action Button on mobile */}
      <div
        className={`${styles.floatingButton}`}
        onClick={toggleSearch}
        style={{ cursor: "pointer" }} // Change cursor to pointer
      >
        <FaSearch /> {/* Search icon */}
      </div>
      {/* Left Arrow */}
      <div
        className={`${styles.arrowButton} ${styles.leftArrow}`}
        onClick={prevImage}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          left: "10px", // Position it on the left side
          transform: "translateY(-50%)", // Center the arrow vertically
        }}
      >
        <FaChevronLeft size={20} color="white" />
      </div>

      {/* Right Arrow */}
      <div
        className={`${styles.arrowButton} ${styles.rightArrow}`}
        onClick={nextImage}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          right: "10px", // Position it on the right side
          transform: "translateY(-50%)", // Center the arrow vertically
        }}
      >
        <FaChevronRight size={20} color="white" />
      </div>
    </div>
  );
};

export default Hero;
