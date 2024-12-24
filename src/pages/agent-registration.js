import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const AgentRegistration = () => {
  const [formData, setFormData] = useState({
    agencyName: '',
    email: '',
    contactName: '',
    gstNumber: '',
    panCard: '',
    operationCity: '',
    address: '',
  });

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
      const response = await fetch('/api/agent-registration', {
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
          gstNumber: '',
          panCard: '',
          operationCity: '',
          address: '',
        });
      } else {
        toast.error('Failed to submit registration');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Agent Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Travel Agency Name</label>
                  <input
                    type="text"
                    name="agencyName"
                    className="form-control"
                    value={formData.agencyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Official Email ID</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Name</label>
                  <input
                    type="text"
                    name="contactName"
                    className="form-control"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    className="form-control"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">PAN Card</label>
                  <input
                    type="text"
                    name="panCard"
                    className="form-control"
                    value={formData.panCard}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Operation City</label>
                  <input
                    type="text"
                    name="operationCity"
                    className="form-control"
                    value={formData.operationCity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Send for Approval
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRegistration; 