import React from "react";
import bannerImage from "assets/img/brand/banner.png";

export default function Homeoffercards() {
  return (
    <div class="container">
      <div class="pt-4 pb-4 text-center mx-auto">
        <h1 class="fw-black">Book Direct Offer </h1>
      </div>
      <div class="mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        <div class="col">
          <a href="offers">
            <img src={bannerImage} alt="Description" />
          </a>
          <p class="ofr ofrup">Sun, Sand, and Savings </p>
          <p class="ofrdn">20% Discount on Room Bookings. </p>

          <div class="btnHomeOffer">
            {" "}
            <p href="#" className="def-offer">
              Inclusions{" "}
            </p>
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
