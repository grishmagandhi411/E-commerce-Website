import React, { useState } from 'react';
import axios from 'axios';

const LoginOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { email });
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error verifying OTP');
    }
  };

  return (
    <div>
      <h2>OTP Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={otpSent}
      />
      {!otpSent ? (
        <button onClick={handleSendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginOtp;
