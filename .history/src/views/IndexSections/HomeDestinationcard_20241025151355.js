import React from "react";
import bannerImage from "assets/img/brand/banner.png";
// reactstrap components
import {
  Card,
  CardImg,
   Container,
  Row,
  Col,
} from "reactstrap";

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
        <Row className="row-grid align-items-center">
          <Col md="12">
            <Card className="bg-white shadow border-0">
              <CardImg
                alt="..."
                src={require("assets/img/theme/img-1-1200x1000.jpg")}
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
                <p className="lead text-italic text-white">
                  The Arctic Ocean freezes every winter and much of the sea-ice
                  then thaws every summer, and that process will continue
                  whatever happens.
                </p>
              </blockquote>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
