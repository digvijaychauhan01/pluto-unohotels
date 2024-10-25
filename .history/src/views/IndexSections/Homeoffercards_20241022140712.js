import React from "react";
import Image from "assets/img/brand/banner.png";

export default function Homeoffercards() {
  return (
    <div class="container">
      <div class="pt-4 pb-4 text-center mx-auto">
        <h1 class="fw-black">Book Direct Offer </h1>
      </div>
      <div class="mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        <div class="col-sm-12 offer-1">
          <a href="offers">
            <Image
              class=" lazyloaded"
              src="https://www.royalorchidhotels.com/images/special-offers/16O_Jan_2024_07_18_56offer1.jpg"
            />{" "}
          </a>
          <p class="ofr ofrup">Sun, Sand, and Savings </p>
          <p class="ofrdn">20% Discount on Room Bookings. </p>
          <input
            type="hidden"
            name="RptCorporateOffer$ctl00$HidOfferID"
            id="RptCorporateOffer_ctl00_HidOfferID"
            value="290"
          />
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
