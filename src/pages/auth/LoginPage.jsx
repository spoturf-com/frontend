import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import OTPInput from "./OTPInput";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login, verifyOtp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || "/";
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For handling errors

  const goback = from;

  const handleMobileNumberSubmit = async (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      await login(`+91${mobileNumber}`);
      setShowOtpInput(true);
      setErrorMessage(""); // Clear error if successful
    } catch (error) {
      setErrorMessage("Error sending OTP. Please try again.");
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const user = await verifyOtp(`+91${mobileNumber}`, otp);
      if (user) {
        const redirectTo = from;
        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      setErrorMessage("OTP verification failed. Please try again.");
      toast.error("OTP verification failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("OTP verification failed:", error);
    }
  };

  const handleClose = () => {
    navigate(goback);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      {/* Close Button positioned at the top-right corner */}
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
      <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-primary">
        Spoturf Login
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        {!showOtpInput ? (
          <form onSubmit={handleMobileNumberSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Enter your mobile number
            </h3>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-primary">
              <span className="px-2 text-gray-600">+91</span>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Mobile Number"
                maxLength={10}
                className="w-full p-3 focus:outline-none rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <OTPInput length={6} onSubmit={handleOtpSubmit} />
        )}
      </div>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link to={"/register"} className="text-gray-900">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
