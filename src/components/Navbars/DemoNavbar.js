import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import { Badge } from "reactstrap";
import { useAuth } from "../../context/AuthContext";

// reactstrap components
import {
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
import Modals from "views/IndexSections/Modals";

// Create a functional wrapper to use the useAuth hook
const DemoNavbarWithAuth = () => {
  const { user, handleSignOut } = useAuth();
  return <DemoNavbar user={user} handleSignOut={handleSignOut} />;
};

class DemoNavbar extends React.Component {
  componentDidMount() {
    // Configure Headroom
    let headroom = new Headroom(document.getElementById("navbar-main"), {
      offset: 300, // Distance in px before element starts showing/hiding
      tolerance: 10, // Scroll tolerance in px before state changes
      classes: {
        initial: "headroom",
        pinned: "headroom--pinned",
        unpinned: "headroom--unpinned",
        top: "headroom--top",
        notTop: "headroom--not-top",
      }
    });
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

  render() {
    const { user, handleSignOut } = this.props;

    // Function to display user identifier (email or phone)
    const getUserDisplayName = (user) => {
      if (!user) return '';
      if (user.username) return user.username;
      if (user.email) return user.email.split('@')[0];
      if (user.phone) return `+91 ${user.phone}`;
      return 'User';
    };

    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main fixed-top navbar-transparent navbar-light headroom !p-0"
            expand="lg"
            id="navbar-main"
          >
            <Container className="py-[12px]">
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  className="h-[40px]"
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
                                New 4Star Hotel
                              </Badge>
                            </h6>
                            <h4 style={{ fontSize: "12px" }} className="">
                              Best For wedding, Corporate party
                            </h4>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"

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
                            <h5 className="heading text-primary mb-md-1">
                              Alpine Hotel and villa
                              <Badge className="ml-2" color="warning">
                                New 4Star Hotel
                              </Badge>
                            </h5>
                            <h4 style={{ fontSize: "12px" }} className="">
                              Best For wedding, Corporate party
                            </h4>
                          </Media>
                        </Media>

                        <Media
                          className="d-flex align-items-center"

                        >
                          <div
                            style={{
                              backgroundImage: `url(../assets/img/brand/grand.jpeg)`,
                              backgroundSize: "cover", // Optional: for better fitting
                              backgroundPosition: "center", // Optional: for better positioning
                              height: "50px",
                              width: "50px",
                            }}
                            className="con icon-shape  text-white"
                          ></div>
                          <Media body className="ml-3">
                            <h5 className="heading text-primary mb-md-1">
                              Grand Hills Hotel and spa
                              <Badge className="ml-2" color="info">
                                Coming Soon
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
                      <span className="nav-link-inner--text">Weddings</span>
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
                  <Link className="nav-link inner--text" >
                    About Us 
                  </Link>
                  <Link className="nav-link inner--text" to="/gallery">
                    Gallery
                  </Link>
                  <Link className="nav-link inner--text" to="/contact-us">
                    Contact Us
                  </Link>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  {user ? (
                    <UncontrolledDropdown nav>
                      <DropdownToggle nav className="px-[16px] py-[8px] flex items-center">
                        <div className="w-[32px] h-[32px] rounded-full bg-blue-100 flex items-center justify-center mr-[8px]">
                          <span className="text-blue-600 font-medium text-[14px]">
                            {getUserDisplayName(user).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="nav-link-inner--text text-[14px]">
                          {getUserDisplayName(user)}
                        </span>
                      </DropdownToggle>
                      <DropdownMenu right className="py-[8px]">
                        <DropdownItem 
                          className="px-[16px] py-[8px]"
                          to="/profile-page" 
                          tag={Link}
                        >
                          <i className="ni ni-single-02 mr-[8px]" />
                          My Profile
                        </DropdownItem>
                        <DropdownItem 
                          className="px-[16px] py-[8px]"
                          to="/bookings" 
                          tag={Link}
                        >
                          <i className="ni ni-calendar-grid-58 mr-[8px]" />
                          My Bookings
                        </DropdownItem>
                        <DropdownItem divider className="my-[4px]" />
                        <DropdownItem 
                          className="px-[16px] py-[8px] text-red-600 hover:text-red-700"
                          onClick={handleSignOut}
                        >
                          <i className="ni ni-user-run mr-[8px]" />
                          Sign Out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <>
                      <NavItem>
                        <NavLink 
                          to="/login-page" 
                          tag={Link}
                          className="px-[16px] py-[8px]"
                        >
                          <span className="nav-link-inner--text">Sign In</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink 
                          to="/register-page" 
                          tag={Link}
                          className="px-[16px] py-[8px]"
                        >
                          <span className="nav-link-inner--text">Register</span>
                        </NavLink>
                      </NavItem>
                    </>
                  )}

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

                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Modals />
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

// Add some custom CSS for the dropdown
const dropdownStyles = `
.dropdown-menu {
  min-width: 200px;
  margin-top: 8px;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
}

.dropdown-item {
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8fafc;
  }
  
  i {
    font-size: 14px;
  }
}

.dropdown-divider {
  margin: 4px 0;
  border-color: #e2e8f0;
}
`;

// Add this to your styles
const userAvatarStyles = `
.user-avatar {
  background: linear-gradient(45deg, #4299e1, #667eea);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
}
`;

// Export the wrapped component
export default DemoNavbarWithAuth;
