import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';

const LoginOtp = () => {
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  useEffect(() => {
    const sendOtp = async () => {
      try {
        const response = await axios.post(backendUrl + '/send-otp', { email: localStorage.getItem('email') });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.error || 'Error sending OTP');
      }
    }
    sendOtp();
  }, []);

  const handleVerifyOtp = async () => {
    try {
      const email = localStorage.getItem('email');
      const response = await axios.post(backendUrl + '/verify-otp', { email, otp });
      localStorage.setItem('token', localStorage.getItem('temp'));
      setToken(localStorage.getItem('temp'));
      localStorage.removeItem('temp');
      localStorage.removeItem('email');
      navigate('/'); // Redirect to home page or any other page

      setMessage(response.data.message);
    } catch (error) {

      console.error('Error verifying OTP:', error);
      setMessage(error.response?.data?.error || 'Error verifying OTP');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-gray-100 shadow-md">
  <h2 className="text-2xl font-semibold text-center mb-4">OTP Login</h2>
  <>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleVerifyOtp}
      className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
    >
      Verify OTP
    </button>
  </>
  {message && <p className="text-center text-red-500 mt-4">{message}</p>}
</div>

  );
};



export default LoginOtp;
