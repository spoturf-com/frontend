// src/pages/auth/VerifyRegisterOTP.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';

const VerifyRegisterOTP = () => {
  const { verifyRegisterOTP, error } = useContext(AuthContext);
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyRegisterOTP({ otp });
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyRegisterOTP;
