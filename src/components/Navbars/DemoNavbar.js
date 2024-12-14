import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import { useAuth } from "../../context/AuthContext";
import config from "config";

// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import Modals from "views/IndexSections/Modals";

// Create a functional wrapper to use the useAuth hook
const DemoNavbarWithAuth = () => {
  const { user, handleSignOut } = useAuth();
  return <DemoNavbar user={user} handleSignOut={handleSignOut} />;
};

const DemoNavbar = ({ user, handleSignOut }) => {
  const [cities, setCities] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoveredHotel, setHoveredHotel] = useState(null);

  useEffect(() => {
    // Configure Headroom
    let headroom = new Headroom(document.getElementById("navbar-main"), {
      offset: 300,
      tolerance: 10,
      classes: {
        initial: "headroom",
        pinned: "headroom--pinned",
        unpinned: "headroom--unpinned",
        top: "headroom--top",
        notTop: "headroom--not-top",
      }
    });
    headroom.init();
  }, []);

  useEffect(() => {
    // Fetch cities with hotels
    fetch(`${config.API_HOST}/api/city/cities-with-hotels`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCities(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

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
                  <DropdownMenu className="dropdown-menu-md">
                    {cities.map((city) => (
                      <div key={city.city} className="city-dropdown">
                        <DropdownItem
                          onMouseEnter={() => setHoveredCity(city.city)}
                          onMouseLeave={() => {
                            if (!hoveredHotel) {
                              setHoveredCity(null);
                            }
                          }}
                        >
                          {city.city}
                        </DropdownItem>
                        {hoveredCity === city.city && (
                          <div className="hotel-dropdown min-h-[300px] min-w-[200px] w-full">
                            {city.hotels.map((hotel) => (
                              <DropdownItem
                                key={hotel.id}
                                to={`/booking?propertyId=${hotel.id}`}
                                tag={Link}
                                onMouseEnter={() => setHoveredHotel(hotel.id)}
                                onMouseLeave={() => setHoveredHotel(null)}
                              >
                                <div className="w-full overflow-hidden truncate whitespace-nowrap">   {hotel.name}</div>
                             
                              </DropdownItem>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                
                  <Modals page="nav"/>
               
                </UncontrolledDropdown>
                <Link className="nav-link inner--text">
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
                        to="/my-bookings" 
                        tag={Link}
                      >
                        <i className="ni ni-calendar-grid-58 mr-[8px]" />
                        My Bookings
                      </DropdownItem>
                      <DropdownItem divider className="my-[4px]" />
                      <DropdownItem 
                        to="/bookings" 
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
                {/* Other nav items */}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

// Export the wrapped component
export default DemoNavbarWithAuth;