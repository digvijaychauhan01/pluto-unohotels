import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import bannerImage from "assets/img/brand/banner.jpeg";
import Search from "./Search";

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover", // Optional: for better fitting
              backgroundPosition: "center", // Optional: for better positioning
            }}
            className="section section-hero section-shaped"
          >
            {/* Background circles */}

            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <p className="lead text-white">
                      A beautiful Design System for Bootstrap 4. It's Free and
                      Open Source.
                    </p>
                  </Col>
                </Row>
              </div>
         
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
