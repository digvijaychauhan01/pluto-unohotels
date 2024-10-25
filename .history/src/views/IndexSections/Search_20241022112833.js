import React from "react";
import styles from "./Search.module.css";

export default function Search() {
  return (
    <div>
      <div
        className={`${styles["banner-text"]} ${styles.booking_ul_new} wow fadeIn`}
        data-wow-duration="1s"
        data-wow-delay="1s"
      >
        <div
          className={`${styles.col_md_12} ${styles.form_group} has-feedback`}
        >
          <ul className={styles.booking_ul}>
            <li>
              <label>City</label>
              <select
                name="BookingEngine$DdlCity"
                id="BookingEngine_DdlCity"
                className={styles.form_control}
                onChange={() => sethotel()} // Assuming you have a function defined elsewhere
              >
                <option value="0">City</option>
                {/* Options here */}
              </select>
              <input
                type="hidden"
                name="BookingEngine$hidCityAbb"
                id="BookingEngine_hidCityAbb"
              />
            </li>
            <li className={styles.drop_hotel}>
              <label>Hotel</label>
              <div className={styles.form_group}>
                <select
                  name="BookingEngine$DdlHotel"
                  id="BookingEngine_DdlHotel"
                  className={styles.form_control}
                >
                  <option value="0">Select Hotel</option>
                </select>
              </div>
            </li>
            <li>
              <label>Check In</label>
              <div className={styles.form_group}>
                <input
                  id="dp1"
                  type="text"
                  className={`${styles.form_control} clickable input-md`}
                  readOnly
                  placeholder="Arrival"
                />
              </div>
            </li>
            <li>
              <label>Check Out</label>
              <div className={styles.form_group}>
                <input
                  id="dp2"
                  type="text"
                  className={`${styles.form_control} clickable input-md`}
                  readOnly
                  placeholder="Departure"
                />
              </div>
            </li>
            <li>
              <label>Rooms</label>
              <select name="room" id="room" className={styles.form_control}>
                <option value="0">Rooms</option>
                <option value="1" selected>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </li>
            <li>
              <label>Adults</label>
              <select className={styles.form_control} name="adut" id="adut">
                <option value="1">Adults</option>
                <option value="1">1</option>
                <option value="2" selected>
                  2
                </option>
                <option value="3">3</option>
              </select>
            </li>
            <li>
              <label>Children</label>
              <select className={styles.form_control} id="child">
                <option value="0">Children</option>
                <option value="0" selected>
                  0
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </li>
            <li>
              <label>Promo Code</label>
              <div className={styles.form_group}>
                <input
                  className={styles.form_control}
                  id="PromoCode"
                  autoComplete="off"
                  type="text"
                  placeholder="Promo Code"
                />
              </div>
            </li>
            <li>
              <label></label>
              <input
                name="bth"
                id="bth"
                value="Book Now"
                onClick={() => ValidateBookingHotelCorparate()} // Assuming you have this function defined
                className={styles.bkbtn}
                type="button"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
