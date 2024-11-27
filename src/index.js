import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import './index.css';

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Contactus from "views/examples/Contactus";
import Product from "views/IndexSections/Product";
import Gallery from "views/IndexSections/Gallery";
import BookingConfirmation from "views/examples/BookingConfirmation";
import PaymentSuccess from "views/examples/PaymentSuccess.js";

const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  
  if (!storedUser) {
    const currentPath = window.location.pathname + window.location.search;
    return <Navigate to={`/login-page?redirect=${encodeURIComponent(currentPath)}`} replace />;
  }
  
  return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            padding: '16px',
            borderRadius: '8px',
          },
        }}
      />
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/landing-page" exact element={<Landing />} />
        <Route path="/login-page" exact element={<Login />} />
        <Route path="/register-page" exact element={<Register />} />
        <Route path="/contact-us" exact element={<Contactus />} />
        <Route path="/gallery" exact element={<Gallery />} />
        <Route path="/profile-page" exact element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/booking" element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        } />
        <Route path="/product-page" exact element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        } />
        <Route path="/booking-confirmation" element={
          <ProtectedRoute>
            <BookingConfirmation />
          </ProtectedRoute>
        } />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
