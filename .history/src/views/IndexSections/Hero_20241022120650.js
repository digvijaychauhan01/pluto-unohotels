import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import bannerImage from "assets/img/brand/banner.png";
import Search from "./Search";

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <Search />
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
                     
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
           
           
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
