import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
export default function VerifyOTP() {
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("name");
    const password = sessionStorage.getItem("password");

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verifyotp`,
        { email, otp }
      );
      // console.log(response);
      if (response.status === 200) {
        setLoading(false);
        const signupResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/signup`,
          {
            email,
            name,
            password,
          }
        );
        if (signupResponse.status === 200) {
          // console.log(signupResponse)

          navigate("/sign-in");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404 || error.response.status === 401) {
          setError("Invalid OTP");
        } else {
          setError("Internal server error");
        }
      }
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center   bg  px-2  ">
      <div
        className={`sm:max-w-[400px] rounded-md flex flex-col gap-5 py-6 px-2 mt-[12rem] sm:px-6 w-full shadow-md shadow-indigo-600  bg-indigo-900`}
      >
        <h1 className=" text-white text-2xl sm:text-2xl font-semibold">
          Verify OTP
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col  gap-4  ">
          <input
            onChange={changeHandler}
            type="text"
            className="rounded-md bg-black bg-opacity-10 py-2 px-2 text-white  focus:outline-none border-[2px] focus:border-green-600 border-indigo-600"
            placeholder="Enter OTP"
          />
          <span className="text-white  text-sm">OTP will  expire in {timeLeft} seconds</span>

          {error && <span className=" text-red-600 text-sm">*{error}</span>}
          <button className=" bg-indigo-600 rounded-md  text-gray-200 py-2 hover:scale-95 transition-all hover:bg-indigo-700 flex justify-center    font-medium">
            {loading ? (
              <ThreeDots
                height="40"
                width="60"
                wrapperClass
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
