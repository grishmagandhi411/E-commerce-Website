import React, { useState } from 'react';
import axios from 'axios';

const EmailLogin = () => {
       
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { email });
      setStep(2);
    } catch (err) {
      alert('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      alert(res.data.message);
    } catch (err) {
      alert('Invalid or expired OTP');
    }
  };

  return (
    <div>
          {step === 1 && (
        <>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  )
}

export default EmailLogin
