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
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import Modals from "views/IndexSections/Modals";
import { toast } from 'react-hot-toast';

// Add this CSS at the top of your file or in your styles
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(5px)',
  },
  content: {
    borderRadius: '15px',
    border: 'none',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  }
};

// Create a functional wrapper to use the useAuth hook
const DemoNavbarWithAuth = () => {
  const { user, handleSignOut } = useAuth();
  return <DemoNavbar user={user} handleSignOut={handleSignOut} />;
};

const DemoNavbar = ({ user, handleSignOut }) => {
  const [cities, setCities] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoveredHotel, setHoveredHotel] = useState(null);
  const [isAgentLoginOpen, setIsAgentLoginOpen] = useState(false);
  const [agentLoginData, setAgentLoginData] = useState({
    username: '',
    password: ''
  });

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

  const toggleAgentLogin = () => {
    setIsAgentLoginOpen(!isAgentLoginOpen);
  };

  const handleAgentLoginChange = (e) => {
    const { name, value } = e.target;
    setAgentLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAgentLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/agents/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentLoginData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful');
        // Store the token
        localStorage.setItem('agentToken', data.data.token);
        // Close the modal
        toggleAgentLogin();
        // Reset form
        setAgentLoginData({ username: '', password: '' });
        // You might want to redirect to agent dashboard here
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong');
    }
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
                {/* Add Agent Login Button */}
                <NavItem>
                  <Button
                    className="btn-neutral btn-icon bg-none"
                    color="default"
                    onClick={toggleAgentLogin}
                  >
                    <span className="nav-link-inner--text">Agent Login</span>
                  </Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>

      {/* Agent Login Modal */}
      <Modal
        isOpen={isAgentLoginOpen}
        toggle={toggleAgentLogin}
        className="modal-dialog-centered"
        contentClassName="border-0"
        style={modalStyles}
      >
        <div className="modal-header bg-gradient-primary py-4 px-6 align-items-center">
          <div className="d-flex align-items-center">
            <i className="ni ni-key-25 text-white mr-3" style={{ fontSize: '24px' }}></i>
            <h4 className="modal-title text-white mb-0">Agent Login</h4>
          </div>
          <button
            aria-label="Close"
            className="close text-white"
            type="button"
            onClick={toggleAgentLogin}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody className="px-lg-5 py-lg-5 bg-white rounded-bottom">
          <div className="text-center text-muted mb-4">
            <small>Sign in with your credentials</small>
          </div>
          <Form role="form" onSubmit={handleAgentLogin}>
            <FormGroup className="mb-4">
              <Label className="form-control-label">Username</Label>
              <div className="input-group input-group-alternative">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="ni ni-single-02"></i>
                  </span>
                </div>
                <Input
                  placeholder="Enter your username"
                  type="text"
                  name="username"
                  value={agentLoginData.username}
                  onChange={handleAgentLoginChange}
                  className="form-control-alternative"
                  required
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Password</Label>
              <div className="input-group input-group-alternative">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="ni ni-lock-circle-open"></i>
                  </span>
                </div>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={agentLoginData.password}
                  onChange={handleAgentLoginChange}
                  className="form-control-alternative"
                  required
                />
              </div>
            </FormGroup>
            <div className="custom-control custom-control-alternative custom-checkbox mb-3">
              <input
                className="custom-control-input"
                id="rememberMe"
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="rememberMe">
                <span>Remember me</span>
              </label>
            </div>
            <div className="text-center">
              <Button
                className="my-4 px-5"
                color="primary"
                type="submit"
                size="lg"
              >
                Sign In
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <Link 
              to="/agent-registration" 
              className="text-primary"
              onClick={toggleAgentLogin}
            >
              <small>New Agent? Register here</small>
            </Link>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

// Export the wrapped component
export default DemoNavbarWithAuth;