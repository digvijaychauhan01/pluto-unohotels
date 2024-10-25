import React from "react";
import bannerImage from "assets/img/brand/banner.png";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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

      <section className="section bg-secondary">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <Card className="bg-default shadow border-0">
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
                    <polygon
                      className="fill-default"
                      points="0,52 583,95 0,95"
                    />
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
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                </blockquote>
              </Card>
            </Col>
            <Col md="6">
              <div className="pl-md-5">
                <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                  <i className="ni ni-settings" />
                </div>
                <h3>Our customers</h3>
                <p className="lead">
                  Don't let your uses guess by attaching tooltips and popoves to
                  any element. Just make sure you enable them first via
                  JavaScript.
                </p>
                <p>
                  The kit comes with three pre-built pages to help you get
                  started faster. You can change the text and images and you're
                  good to go.
                </p>
                <p>
                  The kit comes with three pre-built pages to help you get
                  started faster. You can change the text and images and you're
                  good to go.
                </p>
                <a
                  className="font-weight-bold text-warning mt-5"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  A beautiful UI Kit for impactful websites
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div class="mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        <div class="col">
          <div class="card shadow-sm">
            <div
              style={{
                backgroundImage: `url(https://pandorahotels.co.in/Latest-image/pandora-kufri.webp)`,
                backgroundSize: "cover", // Optional: for better fitting
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
                Hotel Ashirdwad Castle by UNO Hotels
              </text>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <div
              style={{
                backgroundImage: `url(https://lh3.googleusercontent.com/p/AF1QipONgtLmgezT-kjTHEvDmoODptU9sD5uWXbBlHkI=s680-w680-h510)`,
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
                River Pine Resorts by UNO Hotels
              </text>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <div
              style={{
                backgroundImage: `url(https://lh3.googleusercontent.com/p/AF1QipPwpCfek6nQ7TYjeIlE4f8i2SyKfx4_4_2G2_dI=s1360-w1360-h1020)`,
                backgroundSize: "cover", // Optional: for better fitting
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
                Alpine Hotel and villa By UNO Hotels
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
                Grand Hills Hotel and spa by UNO hotels
              </text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
