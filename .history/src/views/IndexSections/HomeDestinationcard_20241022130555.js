import React from "react";
import bannerImage from "assets/img/brand/banner.png";

export default function HomeDestinationcard() {
    return (
      <div class="container">
        <div class="pt-4 pb-4 text-center mx-auto">
          <h1 class="fw-black">Distinctly Warm Indian Hospitality </h1>
          <p class="lead text-body-secondary">
            Business Hotels | Holiday Destinations | Wildlife Parks | Wedding
            Destinations | Religious Sites | Historic Sites
          </p>
        </div>
        <div class="mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col">
            <div class="card shadow-sm">
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text>Thumbnail</text>
              </svg>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <div
                style={{
                  backgroundImage: `url(${bannerImage})`,
                  backgroundSize: "cover", // Optional: for better fitting
                  backgroundPosition: "center", // Optional: for better positioning
                }}
                className="section section-hero section-shaped"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text>Thumbnail</text>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text>Thumbnail</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
}
