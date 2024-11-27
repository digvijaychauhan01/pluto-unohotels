import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";
import toast from "react-hot-toast";
import DemoNavbar from "components/Navbars/DemoNavbar.js";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const mainContent = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the Privacy Policy");
      return;
    }
    setLoading(true);

    try {
      await signUp(formData);
      toast.success("Account created successfully! Please sign in.");
      navigate("/login-page");
    } catch (error) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DemoNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-gray-900">
        <div className="container mx-auto px-[16px] h-full" ref={mainContent}>
          <div className="flex content-center items-center justify-center h-full pt-[20px]">
            <div className="w-full lg:w-[800px] px-[16px]">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-[24px] shadow-lg rounded-[16px] bg-white border-0">
                <div className="px-[32px] py-[32px]">
                  <div className="text-center mb-[32px]">
                    <h2 className="text-[32px] font-bold text-gray-800 mb-[8px]">
                      Create an Account
                    </h2>
                    <p className="text-gray-600 text-[16px]">
                      Join us for exclusive hotel deals and benefits
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-[24px]">
                      <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="flex flex-wrap gap-[24px] mb-[24px]">
                      <div className="flex-1">
                        <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                          placeholder="name@example.com"
                          required
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-[16px] pointer-events-none">
                            <span className="text-gray-500 text-[16px]">+91</span>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-[56px] pr-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                            placeholder="Enter phone number"
                            pattern="[0-9]{10}"
                            maxLength="10"
                            required
                          />
                        </div>
                        
                      </div>
                    </div>

                    <div className="mb-[24px]">
                      <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                        placeholder="Choose a strong password"
                        required
                      />
                      <p className="mt-[8px] text-[14px] text-gray-600">
                        Must be at least 8 characters long
                      </p>
                    </div>

                    <div className="mb-[24px]">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-[16px] h-[16px] text-blue-600 transition duration-150 ease-in-out rounded-[4px]"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <span className="ml-[8px] text-gray-700 text-[14px]">
                          I agree to the{" "}
                          <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !agreed}
                      className={`w-full py-[12px] rounded-[8px] text-white font-semibold transition-all duration-200 text-[16px]
                        ${loading || !agreed
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-[20px] w-[20px] mr-[12px] text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating account...
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-[24px]">
                    <span className="text-gray-600 text-[14px]">Already have an account? </span>
                    <Link to="/login-page" className="text-blue-600 hover:text-blue-800 font-medium text-[14px]">
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
