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
        <div className="col-md-12">
          <form>
            <ul className="booking_ul"></ul>
           
          </form>
        </div>
      </div>
    </div>
  );
}
