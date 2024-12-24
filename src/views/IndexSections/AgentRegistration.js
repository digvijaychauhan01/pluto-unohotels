import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Container,
  Card,
  CardBody,
  FormGroup,
  Input,
  Button,
  Row,
  Col
} from "reactstrap";

const AgentRegistration = () => {
  const [formData, setFormData] = useState({
    agencyName: '',
    email: '',
    contactName: '',
    phoneNumber: '',
    gstNumber: '',
    panCard: '',
    operationCity: '',
    address: '',
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/agents/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Registration submitted for approval');
        setFormData({
          agencyName: '',
          email: '',
          contactName: '',
          phoneNumber: '',
          gstNumber: '',
          panCard: '',
          operationCity: '',
          address: '',
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to submit registration');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong while submitting the form');
    }
  };

  return (
    <>
      <div className="position-relative">
        {/* Hero for agent registration */}
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="8">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <h2>Agent Registration</h2>
                      <small>Please fill in your details for registration</small>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Travel Agency Name
                            </label>
                            <Input
                              placeholder="Enter agency name"
                              type="text"
                              name="agencyName"
                              value={formData.agencyName}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Official Email ID
                            </label>
                            <Input
                              placeholder="email@example.com"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Contact Name
                            </label>
                            <Input
                              placeholder="Enter contact person name"
                              type="text"
                              name="contactName"
                              value={formData.contactName}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Phone Number
                            </label>
                            <Input
                              placeholder="Enter phone number"
                              type="tel"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Operation City
                            </label>
                            <Input
                              placeholder="Enter city of operation"
                              type="text"
                              name="operationCity"
                              value={formData.operationCity}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              GST Number
                            </label>
                            <Input
                              placeholder="Enter GST number"
                              type="text"
                              name="gstNumber"
                              value={formData.gstNumber}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              PAN Card
                            </label>
                            <Input
                              placeholder="Enter PAN number"
                              type="text"
                              name="panCard"
                              value={formData.panCard}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Address
                            </label>
                            <Input
                              placeholder="Enter complete address"
                              type="textarea"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              rows="3"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="submit"
                          size="lg"
                        >
                          Send for Approval
                        </Button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default AgentRegistration; 