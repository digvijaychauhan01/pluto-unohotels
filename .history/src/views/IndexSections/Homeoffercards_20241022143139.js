import React from "react";
import bannerImage from "assets/img/brand/banner.png";
import styles from "./Search.module.css";

export default function Homeoffercards() {
  return (
    <div className=container>
      <div
        className={`${styles.pt4} ${styles.pb4} ${styles.textCenter} ${styles.mxAuto}`}
      >
        <h1 className={styles.fwBlack}>Book Direct Offer</h1>
      </div>
      <div
        className={`${styles.mb4} row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3`}
      >
        <div className={styles.col}>
          <a href="offers">
            <img
              src={bannerImage}
              height={200}
              width={"100%"}
              alt="Description"
            />
          </a>
          <p className={styles.ofr}>Sun, Sand, and Savings</p>
          <p className={styles.ofrdn}>20% Discount on Room Bookings.</p>

          <div className={styles.btnHomeOffer}>
            <p className={styles.defOffer}>Inclusions</p>
            <select
              name="RptCorporateOffer$ctl00$Ddhotels"
              id="RptCorporateOffer_ctl00_Ddhotels"
            >
              <option value="Book Now">Book Now</option>
              <option value="goa">Goa</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
