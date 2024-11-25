import React, { useState } from "react";
import styles from "./Search.module.css";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Always visible on desktop */}
      <div
        className={`${styles["banner-text"]} ${styles.booking_ul_new} wow fadeIn container`}
        data-wow-duration="1s"
        data-wow-delay="1s"
        style={{
          display: isOpen || window.innerWidth > 768 ? "block" : "none",
        }} // Adjust visibility based on screen size
      >
        <div className="container rounded bg-white col-md-12">
          <form>
            <ul
              className={`${styles.booking_ul} align-items-center pl-0 mb-0 form-row`}
            >
              {/* City Dropdown */}
              <li className="col-md-1">
                <div className="form-group">
                  <label htmlFor="citySelect">City</label>
                  <select className="form-control" id="citySelect">
                    <option>Dharamshala</option>
                    <option>Shimla</option>
                    <option>Manali</option>
                    <option>Kashmir</option>
                    <option>Goa</option>
                  </select>
                </div>
              </li>

              {/* Hotel Dropdown */}
              <li className="col-md-2">
                <div className="form-group">
                  <label htmlFor="hotelSelect">Hotel</label>
                  <select className="form-control" id="hotelSelect">
                    <option>Hotel Ashirdwad Castle</option>
                    <option>River Pine Resorts</option>
                    <option>Alpine Hotel and Villa</option>
                    <option>Grand Hills Hotel and Spa</option>
                    <option>Mount View</option>
                  </select>
                </div>
              </li>

              {/* Check-In Date */}
              <li className="col-md-2">
                <div className="form-group">
                  <label htmlFor="checkIn">Check In</label>
                  <input className="form-control" type="date" id="checkIn" />
                </div>
              </li>

              {/* Check-Out Date */}
              <li className="col-md-2">
                <div className="form-group">
                  <label htmlFor="checkOut">Check Out</label>
                  <input className="form-control" type="date" id="checkOut" />
                </div>
              </li>

              {/* Rooms Dropdown */}
              <li className="col-md-1">
                <div className="form-group">
                  <label htmlFor="roomsSelect">Rooms</label>
                  <select className="form-control" id="roomsSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </li>

              {/* Adult Dropdown */}
              <li className="col-md-1">
                <div className="form-group">
                  <label htmlFor="adultSelect">Adult</label>
                  <select className="form-control" id="adultSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </li>

              {/* Children Dropdown */}
              <li className="col-md-1">
                <div className="form-group">
                  <label htmlFor="childrenSelect">Children</label>
                  <select className="form-control" id="childrenSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </li>

              {/* Submit Button */}
              <li className="col-md-2">
                <button
                  style={{ background: "#000" }}
                  className="btn w-100 btn-primary bg-black"
                  type="submit"
                >
                  Book Now
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>

      {/* Floating Button for Mobile */}
      {window.innerWidth <= 768 && (
        <button
          className={`btn btn-primary floating-btn ${isOpen ? "active" : ""}`}
          onClick={toggleSearch}
          style={{
            position: "fixed", bottom: "20px", right: "20px"
            
            borderRadius: "50%",
  padding: "10px 15px",
  fontSize: "16px",
  z-index: 99999;
           }}
        >
          {isOpen ? "Close" : "Search"}
        </button>
      )}
    </div>
  );
}
