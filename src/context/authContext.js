import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store access token
  const [userData, setUserData] = useState(null); // Store user details object
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  // Load user data and token from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Access token
    const storedUserData = localStorage.getItem("userData"); // User details

    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Parse JSON string to object
    }

    setLoading(false); // Initial loading is complete
  }, []);

  // Clear error message function
  const clearError = () => setErrorMessage("");

  // Registration function to send OTP
  const register = async (mobileNo) => {
    clearError();
    try {
      const response = await axios.post(
        "http://localhost:8800/customer/auth/register",
        { mobileNo }
      );
      return response.data; // Returns OTP sent message or response data
    } catch (error) {
      console.error("Failed to send OTP for registration:", error);
      setErrorMessage("Registration failed. Please try again.");
      throw new Error("Failed to send OTP");
    }
  };

  // Function to verify OTP and complete registration
  const verifyRegisterOtp = async (userData) => {
    clearError();
    try {
      const response = await axios.post(
        "http://localhost:8800/customer/auth/verify-register-otp",
        userData
      );
      setUser(response.data.accessToken); // Set token
      setUserData(response.data.details); // Set user details
      setIsAuthenticated(true);

      localStorage.setItem("user", response.data.accessToken); // Store token
      localStorage.setItem("userData", JSON.stringify(response.data.details)); // Store user details

      return response.data;
    } catch (error) {
      console.error("OTP verification failed:", error);
      setErrorMessage("OTP verification failed. Please try again.");
      throw new Error("OTP verification failed");
    }
  };

  // Login function to send OTP
  const login = async (mobileNumber) => {
    clearError();
    try {
      const response = await axios.post(
        "http://localhost:8800/customer/auth/login",
        { mobileNo: mobileNumber }
      );
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
      throw error;
    }
  };

  // Function to verify OTP and complete login
  const verifyOtp = async (mobileNo, otp) => {
    clearError();
    try {
      const response = await axios.post(
        "http://localhost:8800/customer/auth/verify-login-otp",
        { mobileNo, otp }
      );
      setUser(response.data.accessToken); // Set token
      setUserData(response.data.details); // Set user details
      setIsAuthenticated(true);

      localStorage.setItem("user", response.data.accessToken); // Store token
      localStorage.setItem("userData", JSON.stringify(response.data.details)); // Store user details

      return response.data.accessToken;
    } catch (error) {
      console.error("OTP verification failed:", error);
      setErrorMessage("OTP verification failed. Please try again.");
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        verifyRegisterOtp,
        login,
        verifyOtp,
        logout,
        user,
        userData,
        setUserData,
        isAuthenticated,
        loading,
        errorMessage,
        clearError, // Clear error for components to use
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
