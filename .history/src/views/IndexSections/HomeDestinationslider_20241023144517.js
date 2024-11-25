import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Component } from "react";

export default function HomeDestinationslider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
  };
  return (
    <div class="container">
      <div class="pt-4 pb-4 text-center mx-auto">
        <h1 class="fw-black">Our Newest Hotels </h1>
        <p class="lead text-body-secondary">
          Dharamshala | Kashmir | Goa | Rajasthan
        </p>
      </div>
      <Slider {...settings}>
        <div>
          <div class="card">
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
              <div class="card-body">
                <h5 class="card-title bg-black-500">Card title</h5>
                
                <a href="#" class="btn btn-primary">
                Know More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
        <div>
          <h3>7</h3>
        </div>
      </Slider>
    </div>
  );
}
