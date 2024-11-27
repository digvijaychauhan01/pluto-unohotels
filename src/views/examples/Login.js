import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signIn } from "../../api/auth";
import toast from "react-hot-toast";
import "../../index.css";

import DemoNavbar from "components/Navbars/DemoNavbar.js";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginData = {
        password: formData.password,
        [loginMethod]: formData[loginMethod]
      };
      
      const authResponse = await signIn(loginData);
      console.log('Auth Response:', authResponse);
      
      if (!authResponse.data?.token) {
        throw new Error('Authentication failed: missing token');
      }
      
      login(authResponse);
      toast.success("Welcome back! Ready to plan your next stay?");
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DemoNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-gray-900">
        <div className="container mx-auto px-[16px] h-full">
          <div className="flex content-center items-center justify-center h-full pt-[80px]">
            <div className="w-full lg:w-[500px] px-[16px]">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-[24px] shadow-lg rounded-[16px] bg-white border-0">
                <div className="px-[32px] py-[32px]">
                  <div className="text-center mb-[32px]">
                    <h2 className="text-[32px] font-bold text-gray-800 mb-[8px]">
                      Welcome Back
                    </h2>
                    <p className="text-gray-600 text-[16px]">
                      Sign in to continue to your account
                    </p>
                  </div>

                  {/* Login Method Toggle */}
                  <div className="flex rounded-[8px] bg-gray-100 p-[4px] mb-[24px]">
                    <button
                      className={`flex-1 py-[8px] rounded-[6px] text-[14px] font-medium transition-all duration-200
                        ${loginMethod === 'email' 
                          ? 'bg-white shadow-sm text-blue-600' 
                          : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setLoginMethod('email')}
                    >
                      Email
                    </button>
                    <button
                      className={`flex-1 py-[8px] rounded-[6px] text-[14px] font-medium transition-all duration-200
                        ${loginMethod === 'phone' 
                          ? 'bg-white shadow-sm text-blue-600' 
                          : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setLoginMethod('phone')}
                    >
                      Phone
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-[24px]">
                      <label className="block text-gray-700 text-[14px] font-semibold mb-[8px]">
                        {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                      </label>
                      {loginMethod === 'email' ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                          placeholder="name@example.com"
                          required
                        />
                      ) : (
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
                      )}
                    </div>

                    <div className="mb-[24px]">
                      <div className="flex justify-between items-center mb-[8px]">
                        <label className="block text-gray-700 text-[14px] font-semibold">
                          Password
                        </label>
                        <Link to="/forgot-password" className="text-[14px] text-blue-600 hover:text-blue-800">
                          Forgot Password?
                        </Link>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-[16px] py-[12px] rounded-[8px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-[16px]"
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-[12px] rounded-[8px] text-white font-semibold transition-all duration-200 text-[16px]
                        ${loading 
                          ? 'bg-blue-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-[20px] w-[20px] mr-[12px] text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Signing in...
                        </div>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-[24px]">
                    <span className="text-gray-600 text-[14px]">Don't have an account? </span>
                    <Link to="/register-page" className="text-blue-600 hover:text-blue-800 font-medium text-[14px]">
                      Create one now
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

export default Login;
