import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons from react-icons
import styles from "./Search.module.css";

// API URL for fetching data
const API_URL = "https://backend.unohotelsandresorts.com/api/homepages";

const Footer = () => {
  const [footerImages, setFooterImages] = useState([]); // State to store footer images
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const currentYear = new Date().getFullYear(); // Get the current year

  // Fetch footer images data from API
  const fetchFooterImages = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data from the backend.");
      }
      const data = await response.json();
      // Parse the footer_images string into an array
      const parsedFooterImages = JSON.parse(data[0].footer_images);
      setFooterImages(parsedFooterImages); // Set footer images state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError(error.message); // Set error message if fetch fails
      setLoading(false); // Set loading to false on error
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchFooterImages();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <footer className={styles.footer}>
      {/* Top Section with Navigation Links */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <nav className={styles.navLinks}>
              <a href="#about">ABOUT US</a>
              <a href="#investors">INVESTORS</a>
              <a href="#partners">PARTNER WITH US</a>
              <a href="#team">OUR TEAM</a>
              <a href="#careers">CAREERS</a>
              <a href="#feedback">FEEDBACK</a>
              <a href="#contact">CONTACT US</a>
              <a href="#college">PRESIDENCY COLLEGE</a>
              <a href="#terms">TERMS & CONDITIONS</a>
              <a href="#privacy">PRIVACY POLICY</a>
              <a href="#media">MEDIA</a>
              <a href="#blog">BLOG</a>
              <a href="#sitemap">SITEMAP</a>
              {/* New Product Page Link */}
              <Link to="/product-page">Product Page</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Middle Section with Logos - dynamically render footer images */}
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
          {footerImages.length > 0 ? (
            // Limit to only the first 4 images
            footerImages.slice(0, 5).map((image, index) => (
              <div key={index} className="col-auto" style={{ padding: '10px' }}>
                <img
                  src={`https://backend.unohotelsandresorts.com/footer_images/${image}`}
                  alt={`Footer Image ${index + 1}`}
                  className={styles.logo}
                  style={{ Height: '100%', width: '100%' }} // Adjust the size of images to fit
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No footer images available</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section with Social Icons and Copyright */}
      <div className={`${styles.bottomSection}`}>
        {/* Social Media Icons on the left side */}
        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com/plutotoursandtravels" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com/pluto_tours" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com/pluto_tours_travel/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com/company/pluto-tours-world-holidays-pvt-ltd" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="copyright">
          {/* Copyright Text on the right side */}
          <p className="mt-1">Copyright © {currentYear} UNO Hotel and Resort</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
