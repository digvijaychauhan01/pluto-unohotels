import React from "react";
import bannerImage from "assets/img/brand/banner.png";

export default function HomeDestinationcard() {
  return (
    <div class="container">
      <div class="pt-4 pb-4 text-center mx-auto">
        <h1 class="fw-black">Our Luxury Hotel Collections </h1>
        <p class="lead text-body-secondary">
          Business Hotels | Holiday Destinations | Destinations Wedding |
          Religious Sites | Historic Sites
        </p>
      </div>
      <div class="mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        <div class="col">
          <div class="card shadow-sm">
            <div
              style={{
                backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/3a/61/vivanta-bhubaneswar-exterior.jpg?w=500&h=500&s=1)`,
                backgroundSize: "cover", // Optional: for better fitting
                backgroundPosition: "center", // Optional: for better positioning
                height: "300px",
                boxShadow: "10px 10px 10px 10px #ccc",
                borderRadius: "10px",
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
                  position: "absolute",
                  bottom: "0",
                  padding: "10px",
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
                backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/30/da/06/facade.jpg?w=500&h=500&s=1)`,
                backgroundSize: "cover", // Optional: for better fitting
                backgroundPosition: "center", // Optional: for better positioning
                height: "300px",
                boxShadow: "10px 10px 10px 10px #ccc",
                borderRadius: "10px",
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
                  position: "absolute",
                  bottom: "0",
                  padding: "10px",
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
                backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/21/67/23/mayfair-lagoon.jpg?w=500&h=500&s=1)`,
                backgroundSize: "cover", // Optional: for better fitting
                backgroundPosition: "center", // Optional: for better positioning
                height: "300px",
                boxShadow: "10px 10px 10px 10px #ccc",
                borderRadius: "10px",
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
                  position: "absolute",
                  bottom: "0",
                  padding: "10px",
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
                boxShadow: "10px 10px 10px 10px #ccc",
                borderRadius: "10px",
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
                  position: "absolute",
                  bottom: "0",
                  padding: "10px",
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
