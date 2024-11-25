import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import Modals from "./Modals";

// API URL for fetching data
const API_URL = "https://backend.unohotelsandresorts.com/api/homepages";

export default function Homeoffercards() {
  const [offers, setOffers] = useState([]); // State to store the fetched book_offers data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Fetch book_offers data from API
  const fetchOffers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data from the backend.");
      }
      const data = await response.json();
      // Parse the book_offers string into an array
      const parsedOffers = JSON.parse(data[0].book_offers);
      setOffers(parsedOffers); // Set offers state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError(error.message); // Set error message if fetch fails
      setLoading(false); // Set loading to false on error
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchOffers();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle case if no offers are available
  if (offers.length === 0) {
    return <div>No offers available</div>;
  }

  return (
    <div className="container">
      <div className="text-center">
        <h1 className={`${styles.mainTitle} mt-6`}>Book Direct Offer</h1>
        <hr className={`${styles.titleUnderline} mb-5`} />
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {/* Loop through offers to display each one */}
        {offers.map((offer, index) => (
          <div className="col" key={index}>
            <div className={styles.card}>
              <a href="offers">
                <img
                  src={`https://backend.unohotelsandresorts.com/offer_images/${offer.image}`} 
                  alt={offer.title}
                  className={styles.cardImage}
                />
              </a>
              <div className={styles.cardContent}>
                <p className={styles.offerTitle}>{offer.title}</p>
                <p className={styles.offerDescription}>{offer.offers}</p>
                <div className={styles.btnContainer}>
                  <Modals />
                  <button
                    className={`${styles.bookNowBtn} dropdown-toggle`}
                    data-bs-toggle="dropdown"
                  >
                    Book Now
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Option 1</a></li>
                    <li><a className="dropdown-item" href="#">Option 2</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
