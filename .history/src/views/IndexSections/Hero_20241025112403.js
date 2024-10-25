import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import bannerImage from "assets/img/brand/ashirbad.webp";
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
                    <p className="lead text-white"></p>
                  </Col>
                </Row>
              </div>
            </Container>
            <Search />
          </section>
        </div>
      </>
    );
  }
}

export default Hero;



import React from "react";
import Slider from "react-slick";
import { Button, Container, Row, Col } from "reactstrap";
import bannerImage1 from "assets/img/brand/ashirbad.webp";
import bannerImage2 from "assets/img/brand/riverpine.jpg";
import bannerImage3 from "assets/img/brand/ashirbad.webp";
import Search from "./Search";

class Hero extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    const images = [bannerImage1, bannerImage2, bannerImage3];

    return (
      <>
        <div className="position-relative">
          <section className="section section-hero section-shaped">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <div
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "100vh", // Adjust height as needed
                    }}
                    className="slider-item"
                  >
                    <Container className="shape-container d-flex align-items-center py-lg">
                      <div className="col px-0">
                        <Row className="align-items-center justify-content-center">
                          <Col className="text-center" lg="6">
                            <p className="lead text-white"></p>
                          </Col>
                        </Row>
                      </div>
                    </Container>
                  </div>
                </div>
              ))}
            </Slider>
            <Search />
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
