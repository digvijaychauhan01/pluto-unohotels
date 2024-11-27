import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    
    const paymentId = searchParams.get('razorpay_payment_id');
    const orderId = searchParams.get('razorpay_order_id');
    const bookingId = searchParams.get('bookingId');

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/payment/details/${paymentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch payment details');
                }

                const data = await response.json();
                setPaymentDetails(data.data);
            } catch (error) {
                toast.error('Failed to load payment details');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (paymentId) {
            fetchPaymentDetails();
        }
    }, [paymentId, token]);

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
                        {/* Success Header */}
                        <div className="text-center p-[32px] bg-gradient-to-r from-green-500 to-green-600 rounded-t">
                            <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mx-auto mb-[24px] shadow-lg">
                                <i className="ni ni-check-bold text-[40px] text-green-500"></i>
                            </div>
                            <h2 className="text-[28px] font-bold text-white mb-[8px]">Payment Successful!</h2>
                            <p className="text-green-100">Thank you for your booking</p>
                        </div>

                        <div className="p-[32px] space-y-[32px]">
                            {/* Payment Details */}
                            <div className="bg-green-50 p-[24px] rounded-lg">
                                <h3 className="text-[20px] font-semibold text-green-800 mb-[20px]">
                                    Payment Information
                                </h3>
                                <Row className="g-4">
                                    <Col md="3" sm="6">
                                        <div className="text-center p-[16px] bg-white rounded-lg shadow-sm">
                                            <i className="ni ni-credit-card text-[24px] text-green-500 mb-[8px]"></i>
                                            <p className="text-sm text-gray-600 mb-[4px]">Transaction ID</p>
                                            <p className="font-semibold">{paymentId}</p>
                                        </div>
                                    </Col>
                                    <Col md="3" sm="6">
                                        <div className="text-center p-[16px] bg-white rounded-lg shadow-sm">
                                            <i className="ni ni-money-coins text-[24px] text-green-500 mb-[8px]"></i>
                                            <p className="text-sm text-gray-600 mb-[4px]">Amount Paid</p>
                                            <p className="font-semibold">₹{paymentDetails?.amount / 100}</p>
                                        </div>
                                    </Col>
                                    <Col md="3" sm="6">
                                        <div className="text-center p-[16px] bg-white rounded-lg shadow-sm">
                                            <i className="ni ni-calendar-grid-58 text-[24px] text-green-500 mb-[8px]"></i>
                                            <p className="text-sm text-gray-600 mb-[4px]">Payment Date</p>
                                            <p className="font-semibold">
                                                {new Date(paymentDetails?.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md="3" sm="6">
                                        <div className="text-center p-[16px] bg-white rounded-lg shadow-sm">
                                            <i className="ni ni-tag text-[24px] text-green-500 mb-[8px]"></i>
                                            <p className="text-sm text-gray-600 mb-[4px]">Payment Method</p>
                                            <p className="font-semibold">{paymentDetails?.method}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            {/* Booking Reference */}
                            <div className="bg-white p-[24px] rounded-lg border">
                                <h3 className="text-[20px] font-semibold text-gray-800 mb-[20px]">Booking Reference</h3>
                                <div className="flex items-center justify-between bg-gray-50 p-[16px] rounded-lg">
                                    <div>
                                        <p className="text-gray-600">Booking ID</p>
                                        <p className="font-semibold text-[16px]">#{bookingId}</p>
                                    </div>
                                    <Link to={`/booking-confirmation?bookingId=${bookingId}`}>
                                        <Button color="primary" size="sm">
                                            View Booking Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="bg-blue-50 p-[24px] rounded-lg">
                                <h3 className="text-[20px] font-semibold text-blue-800 mb-[20px]">Next Steps</h3>
                                <div className="space-y-[16px]">
                                    <div className="flex items-start space-x-[16px]">
                                        <div className="w-[24px] h-[24px] bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-800">Check Your Email</h4>
                                            <p className="text-blue-600">We've sent you a confirmation email with all the details of your booking.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-[16px]">
                                        <div className="w-[24px] h-[24px] bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-800">Save Your Booking Reference</h4>
                                            <p className="text-blue-600">Keep your booking ID handy for future reference: #{bookingId}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-[16px]">
                                        <div className="w-[24px] h-[24px] bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-800">Download Your Receipt</h4>
                                            <p className="text-blue-600">You can download your payment receipt for your records.</p>
                                        </div>
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
                                    Download Receipt
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Container>
            </div>
            <SimpleFooter />
        </>
    );
};

export default PaymentSuccess; 