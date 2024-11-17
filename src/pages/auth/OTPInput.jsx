import { useRef, useState } from "react";

const OTPInput = ({ length = 6, onSubmit }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }
    if (value === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (index === 0 && otp[index] === "") {
        setOtp(Array(length).fill("")); // Clear OTP if backspace is pressed at the first input
      } else if (otp[index] === "" && index > 0) {
        inputs.current[index - 1].focus(); // Move focus to previous input if current is empty
      } else {
        const newOtp = [...otp];
        newOtp[index] = ""; // Remove character if backspace is pressed
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp.join(""));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center space-x-2">
        {otp.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputs.current[index] = el)}
            className="w-10 h-10 text-center text-lg font-medium border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        ))}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none"
      >
        Submit OTP
      </button>
    </form>
  );
};
export default OTPInput;
