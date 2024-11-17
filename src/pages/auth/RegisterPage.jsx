import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import OTPInput from "./OTPInput"; // Import OTPInput component

const Register = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const { register, verifyRegisterOtp } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle OTP sending
  const handleRegister = async () => {
    try {
      const responseMessage = await register(`+91${mobileNo}`);
      setMessage(responseMessage);
      setIsOtpSent(true); // OTP has been sent, so allow OTP entry
    } catch (error) {
      setMessage("Error sending OTP. Please try again.");
    }
  };

  // Handle OTP verification and registration
  const handleVerifyOtp = async (enteredOtp) => {
    const userData = {
      mobileNo: `+91${mobileNo}`,
      otp: enteredOtp,
      name,
      email,
      area,
      profilePic,
    };
    try {
      const responseMessage = await verifyRegisterOtp(userData);
      setMessage(responseMessage);
      navigate("/");
    } catch (error) {
      setMessage("OTP verification failed. Please try again.");
    }
  };
  const handleClose = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleClose}
          type="button"
          className="bg-primary rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Spoturf Register</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        {message && <div className="mb-4 text-red-500 text-sm">{message}</div>}
        {!isOtpSent ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Register with your mobile number
            </h3>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-primary mb-4">
              <span className="px-2 text-gray-600">+91</span>
              <input
                type="text"
                value={mobileNo}
                onChange={(e) =>
                  setMobileNo(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Mobile Number"
                maxLength={10}
                className="w-full p-3 focus:outline-none rounded-xl"
              />
            </div>
            <button
              onClick={handleRegister}
              className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="text"
              placeholder="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none"
            />
            <OTPInput length={6} onSubmit={handleVerifyOtp} />
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
