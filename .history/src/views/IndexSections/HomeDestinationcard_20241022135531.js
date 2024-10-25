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
      <div class="mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        <div class="col">
          <div class="card shadow-sm">
            <div
              style={{
                backgroundImage: `url(https://www.royalorchidhotels.com/Images/slide-business.webp)`,
                backgroundSize: "cover", // Optional: for better fitting
                backgroundPosition: "center", // Optional: for better positioning
                              height: "300px",
                              boxShadow: "10px 10px 10px 10px #ccc",
                borderRadius: 10px;
              }}
              className="business_card"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text
                style={{
                  width: "100%",
                  float: "left",
                  background: "#000",
                  textAlign: "center",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Thumbnail
              </text>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <div
              style={{
                backgroundImage: `url(https://www.royalorchidhotels.com/Images/slide-wedding.webp)`,
                backgroundSize: "cover", // Optional: for better fitting
                backgroundPosition: "center", // Optional: for better positioning
                height: "300px",
              }}
              className="business_card"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text
                style={{
                  width: "100%",
                  float: "left",
                  background: "#000",
                  textAlign: "center",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Business
              </text>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <div
              style={{
                backgroundImage: `url(https://www.royalorchidhotels.com/Images/slide-leisure.webp)`,
                backgroundSize: "cover", // Optional: for better fitting
                backgroundPosition: "center", // Optional: for better positioning
                height: "300px",
              }}
              className="business_card"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text
                style={{
                  width: "100%",
                  float: "left",
                  background: "#000",
                  textAlign: "center",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Thumbnail
              </text>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <div
              style={{
                backgroundImage: `url(https://www.royalorchidhotels.com/Images/slide-wildlife.webp)`,
                backgroundSize: "cover", // Optional: for better fitting
                backgroundPosition: "center", // Optional: for better positioning
                height: "300px",
              }}
              className="business_card"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text
                style={{
                  width: "100%",
                  float: "left",
                  background: "#000",
                  textAlign: "center",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Business
              </text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
