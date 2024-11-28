import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Button,
  Spinner
} from "reactstrap";
import { Link } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/booking/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error fetching bookings');
      }

      setBookings(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Error fetching bookings');
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <DemoNavbar />
      <main className="my-bookings-page">
        <div className="position-relative">
          {/* Hero section */}
          <section className="section section-lg section-shaped pb-250 bg-gradient-default">
            <Container className="py-lg-md mt-10 d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="6">
                    <h1 className="display-3 text-white">
                      My Bookings
                    </h1>
                    <p className="lead text-white">
                      View and manage your bookings with UNO Hotels & Resorts
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>

        {/* Bookings list section */}
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Card className="shadow border-0">
                  <CardBody className="p-4">
                    {loading ? (
                      <div className="text-center py-5">
                        <Spinner color="primary" />
                      </div>
                    ) : error ? (
                      <div className="text-center text-danger">{error}</div>
                    ) : bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <Card key={booking._id} className="mb-4 shadow-sm">
                          <CardBody>
                            <Row>
                              <Col lg="8">
                                <h4 className="mb-3">
                                  {booking.propertyId?.propertyName}
                                  <Badge 
                                    color={getStatusBadgeColor(booking.status)} 
                                    className="ml-2"
                                  >
                                    {booking.status}
                                  </Badge>
                                </h4>
                                <div className="mb-3">
                                  <p className="text-muted mb-1">
                                    <i className="ni ni-calendar-grid-58 mr-2"></i>
                                    {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                                  </p>
                                  <p className="text-muted mb-1">
                                    <i className="ni ni-time-alarm mr-2"></i>
                                    Check-in: {booking.checkInTime} • Check-out: {booking.checkOutTime}
                                  </p>
                                  <p className="text-muted mb-1">
                                    <i className="ni ni-building mr-2"></i>
                                    {booking.propertyId?.location?.address}
                                  </p>
                                </div>
                                <div className="rooms-info">
                                  <h5 className="mb-2">Room Details:</h5>
                                  {booking.rooms.map((room, index) => (
                                    <p key={index} className="mb-1">
                                      {room.quantity}x {room.roomName} ({room.planName})
                                    </p>
                                  ))}
                                </div>
                              </Col>
                              <Col lg="4" className="text-right">
                                <div className="mb-3">
                                  <h5 className="mb-1">Booking Reference</h5>
                                  <p className="text-primary font-weight-bold">{booking.bookingReference}</p>
                                </div>
                                <div className="mb-3">
                                  <h5 className="mb-1">Total Amount</h5>
                                  <p className="text-success font-weight-bold">₹{booking.totalAmount}</p>
                                </div>
                                <div className="mt-4">
                                  <Button
                                    color="primary"
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => window.print()}
                                  >
                                    <i className="ni ni-cloud-download-95 mr-1"></i>
                                    Download
                                  </Button>
                                  {booking.status === 'confirmed' && (
                                    <Button
                                      color="danger"
                                      size="sm"
                                      outline
                                    >
                                      Cancel Booking
                                    </Button>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-5">
                        <p className="mb-3">You haven't made any bookings yet.</p>
                        <Link to="/hotels">
                          <Button color="primary">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default MyBookings; 