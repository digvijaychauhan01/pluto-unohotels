/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
// Import the logo
import unoLogo from "../../assets/img/brand/uno.jpeg";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer" style={{ backgroundColor: "#000", color: "#fff", padding: "2rem 0" }}>
          <Container>
            <Row className="row-grid align-items-center mb-5">
              <Col lg="4">
                <div className="mb-3">
                  <img
                    src={unoLogo}
                    alt="UNO Hotels & Resorts"
                    style={{ 
                      height: "40px",
                      marginBottom: "1rem"
                    }}
                  />
                </div>
                <h4 className="mb-0 font-weight-light" style={{ color: "#ccc" }}>
                  Luxury Stays & Memorable Experiences
                </h4>
              </Col>
              <Col lg="4" className="text-center">
                <h4 className="mb-3" style={{ color: "#fff" }}>Contact Us</h4>
                <p style={{ color: "#ccc" }}>
                  <i className="ni ni-pin-3 mr-2"></i>
                  123 Hotel Street, City, State
                </p>
                <p style={{ color: "#ccc" }}>
                  <i className="ni ni-mobile-button mr-2"></i>
                  +91 1234567890
                </p>
                <p style={{ color: "#ccc" }}>
                  <i className="ni ni-email-83 mr-2"></i>
                  info@unohotels.com
                </p>
              </Col>
              <Col lg="4" className="text-lg-right">
                <h4 className="mb-3" style={{ color: "#fff" }}>Quick Links</h4>
                <Nav vertical>
                  <NavItem>
                    <NavLink href="/rooms" style={{ color: "#ccc", padding: "0.3rem 0" }}>
                      Our Rooms
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/dining" style={{ color: "#ccc", padding: "0.3rem 0" }}>
                      Dining
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/amenities" style={{ color: "#ccc", padding: "0.3rem 0" }}>
                      Amenities
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/contact" style={{ color: "#ccc", padding: "0.3rem 0" }}>
                      Contact
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
            <hr style={{ borderColor: "#444" }} />
            <Row className="align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright" style={{ color: "#ccc" }}>
                  © {new Date().getFullYear()}{" "}
                  <span style={{ color: "#fff" }}>
                    UNO Hotels & Resorts
                  </span>
                  . All rights reserved.
                </div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="/privacy"
                      style={{ color: "#ccc" }}
                    >
                      Privacy Policy
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/terms"
                      style={{ color: "#ccc" }}
                    >
                      Terms & Conditions
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
