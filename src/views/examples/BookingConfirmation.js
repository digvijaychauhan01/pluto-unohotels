import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

const BookingConfirmation = () => {
    const [searchParams] = useSearchParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const bookingId = searchParams.get('bookingId');
    const totalAmount = searchParams.get('totalAmount');
    const navigate = useNavigate();
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const { isAuthenticated, token } = useAuth();

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                // if (!isAuthenticated || !token) {
                //     toast.error('Please login to view booking details');
                //     navigate('/login-page');
                //     return;
                // }

                const response = await fetch(`http://localhost:3000/api/booking/property-booking/${bookingId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch booking details');
                }

                const data = await response.json();
                setBooking(data.data);
            } catch (error) {
                toast.error('Failed to load booking details');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (bookingId) {
            fetchBookingDetails();
        }
    }, [bookingId, navigate, isAuthenticated, token]);

    const handlePayment = async () => {
        try {
            // if (!isAuthenticated || !token) {
            //     toast.error('Please login to make payment');
            //     navigate('/login-page');
            //     return;
            // }

            setPaymentProcessing(true);
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                toast.error('Failed to load payment gateway');
                return;
            }

            const orderResponse = await fetch('http://localhost:3000/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: parseInt(totalAmount) * 100,
                    currency: 'INR',
                    bookingId: bookingId
                })
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create payment order');
            }

            const orderData = await orderResponse.json();
            console.log('Order Data:', orderData); // Debug log
            
            const options = {
                key: "rzp_test_HUp5emZ4E3RHU3", // Use your key_id directly
                amount: orderData.data.amount,
                currency: "INR",
                name: 'Hotel Booking',
                description: `Booking ID: ${bookingId}`,
                order_id: orderData.data.orderId,
                prefill: {
                    name: booking.guestDetails.name,
                    email: booking.guestDetails.email,
                    contact: booking.guestDetails.phone
                },
                notes: {
                    bookingId: bookingId
                },
                theme: {
                    color: '#5E72E4'
                },
                handler: async function(response) {
                    try {
                        console.log('Payment Response:', response);
                        const verifyResponse = await fetch('http://localhost:3000/api/orders/verify', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                bookingId: bookingId
                            })
                        });

                        if (!verifyResponse.ok) {
                            throw new Error('Payment verification failed');
                        }

                        const verifyData = await verifyResponse.json();
                        console.log('Verify Response:', verifyData);

                        toast.success('Payment successful!');
                        
                        // Redirect to payment success page with necessary parameters
                        window.location.href = `/payment-success?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}&bookingId=${bookingId}`;

                    } catch (error) {
                        console.error('Payment verification error:', error);
                        toast.error('Payment verification failed');
                    }
                }
            };

            console.log('Razorpay Options:', options); // Debug log

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', function(response) {
                console.error('Payment Failed:', response.error);
                toast.error(`Payment failed: ${response.error.description}`);
            });
            
            razorpay.open();

        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment initialization failed: ' + error.message);
        } finally {
            setPaymentProcessing(false);
        }
    };

    if (loading) {
        return (
            <>
                <DemoNavbar />
                <div className="min-h-screen bg-gray-100 pt-[100px] pb-[64px]">
                    <Container>
                        <Card className="shadow-lg p-[32px] animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        </Card>
                    </Container>
                </div>
                <SimpleFooter />
            </>
        );
    }

    return (
        <>
            <DemoNavbar />
            <div className="min-h-screen bg-gray-100 pt-[100px] pb-[64px]">
                <Container>
                    <Card className="shadow-lg border-0">
                        <div className="text-center p-[32px] bg-gradient-to-r from-blue-500 to-blue-600 rounded-t">
                            <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mx-auto mb-[24px] shadow-lg">
                                <i className="ni ni-check-bold text-[40px] text-blue-500"></i>
                            </div>
                            <h2 className="text-[28px] font-bold text-white mb-[8px]">Booking Confirmed!</h2>
                            <p className="text-blue-100">Booking Reference: #{bookingId}</p>
                        </div>

                        {booking && (
                            <div className="p-[32px] space-y-[32px]">
                                {/* Booking Summary */}
                                <div className="bg-blue-50 p-[24px] rounded-lg">
                                    <h3 className="text-[20px] font-semibold text-blue-800 mb-[20px]">
                                        Booking Summary
                                    </h3>
                                    <Row className="g-4">
                                        <Col md="3" sm="6">
                                            <div className="text-center p-[16px] bg-white rounded-lg shadow-sm">
                                                <i className="ni ni-calendar-grid-58 text-[24px] text-blue-500 mb-[8px]"></i>
                                                <p className="text-sm text-gray-600 mb-[4px]">Check-in</p>
                                                <p className="font-semibold">{new Date(booking.checkInDate).toLocaleDateString('en-US', { 
                                                    weekday: 'short', 
                                                    day: 'numeric', 
                                                    month: 'short' 
                                                })}</p>
                                                <p className="text-sm text-gray-500">{booking.checkInTime}</p>
                                            </div>
                                        </Col>
                                        <Col md="3" sm="6">
                                            <div className="text-center p-[16px] bg-white rounded-lg shadow-sm">
                                                <i className="ni ni-calendar-grid-58 text-[24px] text-blue-500 mb-[8px]"></i>
                                                <p className="text-sm text-gray-600 mb-[4px]">Check-out</p>
                                                <p className="font-semibold">{new Date(booking.checkOutDate).toLocaleDateString('en-US', { 
                                                    weekday: 'short', 
                                                    day: 'numeric', 
                                                    month: 'short' 
                                                })}</p>
                                                <p className="text-sm text-gray-500">{booking.checkOutTime}</p>
                                            </div>
                                        </Col>
                                        <Col md="3" sm="6">
                                            <div className="text-center p-[16px] bg-white rounded-lg shadow-sm">
                                                <i className="ni ni-moon text-[24px] text-blue-500 mb-[8px]"></i>
                                                <p className="text-sm text-gray-600 mb-[4px]">Duration</p>
                                                <p className="font-semibold">{booking.numberOfNights} Nights</p>
                                                <p className="text-sm text-gray-500">{booking.rooms.reduce((acc, room) => acc + room.quantity, 0)} Rooms</p>
                                            </div>
                                        </Col>
                                        <Col md="3" sm="6">
                                            <div className="text-center p-[16px] bg-white rounded-lg shadow-sm">
                                                <i className="ni ni-money-coins text-[24px] text-blue-500 mb-[8px]"></i>
                                                <p className="text-sm text-gray-600 mb-[4px]">Total Amount</p>
                                                <p className="font-semibold">₹{totalAmount}</p>
                                                <p className="text-sm text-gray-500">{booking.paymentStatus}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                {/* Room Details */}
                                <div className="bg-white p-[24px] rounded-lg border">
                                    <h3 className="text-[20px] font-semibold text-gray-800 mb-[20px]">Room Details</h3>
                                    <div className="space-y-[16px]">
                                        {booking.rooms.map((room, index) => (
                                            <div key={index} className="flex items-center justify-between p-[16px] bg-gray-50 rounded-lg">
                                                <div>
                                                    <h4 className="font-semibold text-[16px] text-gray-800">{room.roomName}</h4>
                                                    <p className="text-gray-600">{room.planName}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-800">{room.quantity} Room(s)</p>
                                                    <p className="text-sm text-gray-600">₹{room.ratePerNight} per night</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Policies */}
                                <div className="bg-white p-[24px] rounded-lg border">
                                    <h3 className="text-[20px] font-semibold text-gray-800 mb-[20px]">Hotel Policies</h3>
                                    <div className="space-y-[16px]">
                                        <div className="p-[16px] bg-yellow-50 rounded-lg">
                                            <h4 className="font-medium text-yellow-800 mb-[8px]">Cancellation Policy</h4>
                                            <p className="text-yellow-700">{booking.policies.cancellationPolicy}</p>
                                        </div>
                                        <div className="p-[16px] bg-gray-50 rounded-lg">
                                            <h4 className="font-medium text-gray-800 mb-[8px]">House Rules</h4>
                                            <ul className="list-disc pl-[24px] space-y-[8px]">
                                                {booking.policies.houseRules.map((rule, index) => (
                                                    <li key={index} className="text-gray-600">{rule}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center gap-[16px] pt-[16px]">
                                    <Link to="/">
                                        <Button color="primary" className="px-[32px]">
                                            Back to Home
                                        </Button>
                                    </Link>
                                    <Button color="info" className="px-[32px]" onClick={() => window.print()}>
                                        <i className="ni ni-cloud-download-95 mr-[8px]"></i>
                                        Download
                                    </Button>
                                    {booking?.paymentStatus !== 'PAID' && (
                                        <Button
                                            color="success"
                                            className="px-[32px]"
                                            onClick={handlePayment}
                                            disabled={paymentProcessing}
                                        >
                                            {paymentProcessing ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="ni ni-credit-card mr-[8px]"></i>
                                                    Pay Now
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Card>
                </Container>
            </div>
            <SimpleFooter />
        </>
    );
};

export default BookingConfirmation; 