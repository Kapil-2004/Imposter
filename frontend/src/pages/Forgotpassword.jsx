import axios from "axios";
import react, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";

export const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  //   console.log(email)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgotpassword`,
        { email }
      );
      if (response.status === 200) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404) {
          setError("Sorry,Your account was not found");
        } else {
          setError("Something went wrong.");
        }
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center dark:text-gray-200 text-textColor ">
      <div
        className={`flex flex-col gap-4 mx-2   dark:bg-gray-700 bg-indigo-300 bg-opacity-30   dark:bg-opacity-30 rounded-md  max-w-[400px] sm:py-8 py-6 px-3 sm:px-8 w-full  `}
      >
        <span className="text-2xl font-semibold mb-6 bg-indigo-800  dark:text-gray-300 size-10 flex justify-center items-center  self-center text-gray-200 rounded-full px-[0.5rem]">
          Λ
        </span>
        <h1 className="text-center   font-semibold">
          {success ? "Email Sent" : "Forgot your Password?"}
        </h1>
        {success ? (
          <p className="text-sm">
            An email has been sent to your email address with instructions on
            how to reset your password.
          </p>
        ) : (
          <form onSubmit={submitHandler} className={`flex flex-col  gap-5`}>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md text-sm p-3 bg-transparent border-2 border-gray-600 focus:outline-none focus:border-indigo-700 dark:placeholder:text-gray-200 placeholder:text-textColor placeholder:text-sm placeholder: text-start border-opacity-60"
              type="email"
              placeholder="Enter Your account email"
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}

            <button
              className={`text-sm ${
                loading && "pointer-events-none"
              } hover:scale-95 transition-all font-medium bg-indigo-700 py-2 rounded-md text-gray-200 flex justify-center items-center  `}
            >
              {loading ? (
                <ThreeDots
                  height="25"
                  width="45"
                  wrapperClass
                  color="white"
                  ariaLabel="loading"
                />
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        )}
        <NavLink to="/sign-in">
          <button
            className={`text-sm hover:scale-95 w-full  transition-all ${
              success ? "block" : "hidden"
            } font-medium bg-indigo-700 py-2  rounded-md text-gray-200 `}
          >
            Sign in
          </button>
        </NavLink>

        <span
          className={`text-center font-medium  ${
            success && "hidden"
          } text-sm sm:text-xs`}
        >
          Remember Your password?{" "}
          <NavLink to="/sign-in">
            {" "}
            <span className="font-semibold underline ">Sign in</span>{" "}
          </NavLink>
        </span>
      </div>
    </div>
  );
};
