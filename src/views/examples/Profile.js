import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/profile";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    bio: ""
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || ""
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateProfile(profileData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isEditing) {
    return (
      <>
        <DemoNavbar />
        <main className="profile-page">
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt-[-300px]">
                <div className="p-[32px] text-center">
                  <div className="animate-pulse">
                    <div className="w-[120px] h-[120px] bg-gray-200 rounded-full mx-auto mb-[24px]"></div>
                    <div className="h-[24px] bg-gray-200 rounded w-[200px] mx-auto mb-[16px]"></div>
                    <div className="h-[16px] bg-gray-200 rounded w-[150px] mx-auto"></div>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }

  return (
    <>
      <DemoNavbar />
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          <div className="shape shape-style-1 shape-default alpha-4 bg-gradient-to-br from-blue-900 via-gray-900 to-gray-900">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt-[-300px]">
              <div className="px-[32px] py-[32px]">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <div className="w-[120px] h-[120px] rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                        <span className="text-[48px] font-bold text-blue-600">
                          {profileData.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </Col>
                  
                  <Col className="order-lg-3 text-lg-right align-self-lg-center" lg="4">
                    <div className="card-profile-actions py-[16px] mt-lg-0">
                      {isEditing ? (
                        <div className="flex gap-[16px] justify-end">
                          <Button
                            color="secondary"
                            onClick={() => setIsEditing(false)}
                            size="sm"
                            disabled={loading}
                          >
                            Cancel
                          </Button>
                          <Button
                            color="success"
                            onClick={handleSubmit}
                            size="sm"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="flex items-center">
                                <svg className="animate-spin h-[20px] w-[20px] mr-[8px]" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                              </span>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </div>
                      ) : (
                        <Button
                          color="info"
                          onClick={() => setIsEditing(true)}
                          size="sm"
                        >
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </Col>

                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">0</span>
                        <span className="description">Bookings</span>
                      </div>
                      <div>
                        <span className="heading">0</span>
                        <span className="description">Reviews</span>
                      </div>
                      <div>
                        <span className="heading">0</span>
                        <span className="description">Points</span>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="text-center mt-[32px]">
                  {isEditing ? (
                    <div className="space-y-[24px]">
                      <div>
                        <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={profileData.username}
                          onChange={handleChange}
                          className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleChange}
                          className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                          placeholder="City, Country"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleChange}
                          className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                          rows="4"
                          placeholder="Tell us about yourself"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-[24px] font-bold text-gray-800">
                        {profileData.username}
                      </h3>
                      <div className="text-[16px] text-gray-600 mt-[8px]">
                        <i className="ni ni-email-83 mr-[8px]" />
                        {profileData.email}
                      </div>
                      <div className="text-[16px] text-gray-600 mt-[8px]">
                        <i className="ni ni-mobile-button mr-[8px]" />
                        +91 {profileData.phone}
                      </div>
                      {profileData.location && (
                        <div className="text-[16px] text-gray-600 mt-[8px]">
                          <i className="ni ni-pin-3 mr-[8px]" />
                          {profileData.location}
                        </div>
                      )}
                      {profileData.bio && (
                        <div className="mt-[24px] py-[24px] border-t text-center">
                          <Row className="justify-content-center">
                            <Col lg="9">
                              <p className="text-[16px] text-gray-600">
                                {profileData.bio}
                              </p>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Profile;
