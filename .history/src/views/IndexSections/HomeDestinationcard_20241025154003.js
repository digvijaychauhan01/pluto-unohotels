import React from "react";
import bannerImage from "assets/img/brand/banner.png";
// reactstrap components
import { Card, CardImg, Col } from "reactstrap";

export default function HomeDestinationcard() {
  return (
    <div class="container">
      <div class="pt-4 pb-4 text-center mx-auto">
        <h1 class="fw-black">Our Luxury Hotel Collections </h1>
        <p class="lead text-body-secondary">
          Business Hotels | Holiday Destinations | Destinations Wedding |
          Honeymoon Destinations | Historic Sites
        </p>
      </div>

      <div class="mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <Col>
          <Card
            style={{
              background: "#000",
            }}
            className="shadow-lg border-0"
          >
            <CardImg
              alt="..."
              src={require("assets/img/brand/ashirbad.webp")}
              top
            />
            <blockquote className="card-blockquote">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-bg"
                preserveAspectRatio="none"
                viewBox="0 0 583 95"
              >
                <polygon className="fill-default" points="0,52 583,95 0,95" />
                <polygon
                  className="fill-default"
                  opacity=".2"
                  points="0,42 583,95 683,0 0,95"
                />
              </svg>
              <h4 className="text-center display-4 font-weight-bold text-white">
                Design System
              </h4>
            </blockquote>
          </Card>
        </Col>

        <Col>
          <Card
            style={{
              background: "#000",
            }}
            className="shadow-lg border-0"
          >
            <CardImg
              alt="..."
              src={require("assets/img/brand/riverpine.png")}
              top
            />
            <blockquote className="card-blockquote">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-bg"
                preserveAspectRatio="none"
                viewBox="0 0 583 95"
              >
                <polygon className="fill-default" points="0,52 583,95 0,95" />
                <polygon
                  className="fill-default"
                  opacity=".2"
                  points="0,42 583,95 683,0 0,95"
                />
              </svg>
              <h4 className="text-center display-4 font-weight-bold text-white">
                Design System
              </h4>
            </blockquote>
          </Card>
        </Col>

        <Col>
          <Card
            style={{
              background: "#000",
            }}
            className="shadow-lg border-0"
          >
            <CardImg
              alt="..."
              src={require("assets/img/brand/alpine.jpg")}
              top
            />
            <blockquote className="card-blockquote">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-bg"
                preserveAspectRatio="none"
                viewBox="0 0 583 95"
              >
                <polygon className="fill-default" points="0,52 583,95 0,95" />
                <polygon
                  className="fill-default"
                  opacity=".2"
                  points="0,42 583,95 683,0 0,95"
                />
              </svg>
              <h4 className="display-3 font-weight-bold text-white">
                Design System
              </h4>
            </blockquote>
          </Card>
        </Col>
      </div>
    </div>
  );
}
