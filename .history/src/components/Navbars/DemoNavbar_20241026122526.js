import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import { Badge } from "reactstrap";

import {
  Modal,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap'; // Make sure to import necessary components

import  { useState } from 'react';

// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };
   const [formModal, setFormModal] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const toggleModal = () => {
    setFormModal(!formModal);
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar_custom navbar-light "
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  className="logo_cus"
                  alt="..."
                  src={require("assets/img/brand/unob.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/uno.jpeg")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Our Hotels</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div
                            style={{
                              backgroundImage: `url(https://pandorahotels.co.in/Latest-image/pandora-kufri.webp)`,
                              backgroundSize: "cover", // Optional: for better fitting
                              backgroundPosition: "center", // Optional: for better positioning
                              height: "50px",
                              width: "50px",
                            }}
                            className="con icon-shape  text-white"
                          ></div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Hotel Ashirdwad Castle
                              <Badge className="ml-2" color="warning">
                                {" "}
                                New Hotel
                              </Badge>
                            </h6>
                            <h4 style={{ fontSize: "12px" }} className="">
                              Best For wedding, Corporate party
                            </h4>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div
                            style={{
                              backgroundImage: `url(https://lh3.googleusercontent.com/p/AF1QipONgtLmgezT-kjTHEvDmoODptU9sD5uWXbBlHkI=s680-w680-h510)`,
                              backgroundSize: "cover", // Optional: for better fitting
                              backgroundPosition: "center", // Optional: for better positioning
                              height: "50px",
                              width: "50px",
                            }}
                            className="con icon-shape  text-white"
                          ></div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              River Pine Resorts
                              <Badge className="ml-2" color="warning">
                                New 4 Star Hotel
                              </Badge>
                            </h6>
                            <h4 style={{ fontSize: "12px" }} className="">
                              Best For wedding, Corporate party
                            </h4>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div
                            style={{
                              backgroundImage: `url(https://lh3.googleusercontent.com/p/AF1QipPwpCfek6nQ7TYjeIlE4f8i2SyKfx4_4_2G2_dI=s1360-w1360-h1020)`,
                              backgroundSize: "cover", // Optional: for better fitting
                              backgroundPosition: "center", // Optional: for better positioning
                              height: "50px",
                              width: "50px",
                            }}
                            className="con icon-shape  text-white"
                          ></div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              Alpine Hotel and villa
                              <Badge className="ml-2" color="info">
                                Comming Soon
                              </Badge>
                            </h5>
                            <h4 style={{ fontSize: "12px" }} className="">
                              Best For wedding, Corporate party
                            </h4>
                          </Media>
                        </Media>

                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div
                            style={{
                              backgroundImage: `url(https://www.royalorchidhotels.com/Images/slide-wildlife.webp)`,
                              backgroundSize: "cover", // Optional: for better fitting
                              backgroundPosition: "center", // Optional: for better positioning
                              height: "50px",
                              width: "50px",
                            }}
                            className="con icon-shape  text-white"
                          ></div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              Grand Hills Hotel and span
                              <Badge className="ml-2" color="warning">
                                New 4 Star
                              </Badge>
                            </h5>
                            <h4 style={{ fontSize: "12px" }} className="">
                              Best For wedding, Corporate party
                            </h4>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Pages</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/landing-page" tag={Link}>
                        Landing
                      </DropdownItem>
                      <DropdownItem to="/profile-page" tag={Link}>
                        Profile
                      </DropdownItem>
                      <DropdownItem to="/login-page" tag={Link}>
                        Login
                      </DropdownItem>
                      <DropdownItem to="/register-page" tag={Link}>
                        Register
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">Destination</span>
                  </DropdownToggle>
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">Contact</span>
                  </DropdownToggle>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon email_top_head"
                      href="https://www.facebook.com/creativetim"
                      id="tooltip333589074"
                      target="_blank"
                    >
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Facebook
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip333589074">
                      Email us{" "}
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.instagram.com/creativetimofficial"
                      id="tooltip356693867"
                      target="_blank"
                      style={{
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                    >
                      info@unohotelsandresorts.com
                      <br />
                      +91-9805096956, +91-8353096962
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Instagram
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip356693867">
                      Call us
                    </UncontrolledTooltip>
                  </NavItem>

                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className=" pl-2 pb-1 pr-2 pt-1 btn-icon"
                      color="black"
                      href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                      target="_blank"
                      style={{ background: "#fff", color: "#000" }}
                    >
                      <span className="nav-link-inner--text ml-1">
                        Query Now
                      </span>
                    </Button>

                    <Col md="4">
                      <div>
                        <Button
                          block
                          color="default"
                          type="button"
                          onClick={toggleModal}
                        >
                          Form
                        </Button>
                        <Modal
                          className="modal-dialog-centered"
                          size="sm"
                          isOpen={formModal}
                          toggle={toggleModal}
                        >
                          <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                              <CardHeader className="bg-white pb-5">
                                <div className="text-muted text-center mb-3">
                                  <small>Sign in with</small>
                                </div>
                                <div className="btn-wrapper text-center">
                                  <Button
                                    className="btn-icon mt-2 mb-2"
                                    color="neutral"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <span className="btn-inner--icon mr-1">
                                      <img
                                        alt="..."
                                        src={require("assets/img/icons/common/github.svg")}
                                      />
                                    </span>
                                    <span className="btn-inner--text">
                                      Github
                                    </span>
                                  </Button>
                                  <Button
                                    className="btn-icon mt-2 mb-2 ml-1"
                                    color="neutral"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <span className="btn-inner--icon mr-1">
                                      <img
                                        alt="..."
                                        src={require("assets/img/icons/common/google.svg")}
                                      />
                                    </span>
                                    <span className="btn-inner--text">
                                      Google
                                    </span>
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                  <small>Or sign in with credentials</small>
                                </div>
                                <Form role="form">
                                  <FormGroup
                                    className={`mb-3 ${
                                      emailFocused ? "focused" : ""
                                    }`}
                                  >
                                    <InputGroup className="input-group-alternative">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <i className="ni ni-email-83" />
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input
                                        placeholder="Email"
                                        type="email"
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                  <FormGroup
                                    className={`${
                                      passwordFocused ? "focused" : ""
                                    }`}
                                  >
                                    <InputGroup className="input-group-alternative">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="off"
                                        onFocus={() => setPasswordFocused(true)}
                                        onBlur={() => setPasswordFocused(false)}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                  <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                      className="custom-control-input"
                                      id="customCheckLogin"
                                      type="checkbox"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="customCheckLogin"
                                    >
                                      <span className="text-muted">
                                        Remember me
                                      </span>
                                    </label>
                                  </div>
                                  <div className="text-center">
                                    <Button
                                      className="my-4"
                                      color="primary"
                                      type="button"
                                    >
                                      Sign in
                                    </Button>
                                  </div>
                                </Form>
                              </CardBody>
                            </Card>
                          </div>
                        </Modal>
                      </div>
                    </Col>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
