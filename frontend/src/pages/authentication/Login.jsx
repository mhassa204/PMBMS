import React, { useState } from "react";
// import "./login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const authenticationStyles = {
    labelContainer: "flex items-center justify-between",
    label:
      "after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700",
    inputField:
      "block w-full px-2 py-1.5 rounded-md border ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:text-gray-900 text-gray-900 sm:text-sm sm:leading-6",
    inputFieldError: "text-start text-red-500 text-sm",
    button:
      "w-full px-3 py-1.5 text-sm font-semibold text-white rounded-md bg-[#0b6323] hover:bg-indigo-500 focus:outline-none",
  };

  const handleSubmit = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md border p-8 bg-white rounded login-container">
        <div className="text-center">
          {/* <img
            className="mx-auto h-20"
            src="G:/PMBMS/frontend/public/images/gov.png"
            alt="Your Company"
          /> */}
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form
          className="mt-6 space-y-4"
          action="#"
          onSubmit={handleSubmit}
          method="POST"
        >
          <div>
            <div className={`${authenticationStyles.labelContainer}`}>
              <span className={`${authenticationStyles.label}`}>
                Email address
              </span>
            </div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="ahmad@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className={`${authenticationStyles.inputField} ${
                  invalidEmail ? "ring-red-500 text-red-500" : "ring-gray-300"
                }`}
              />
            </div>
            <p className={`${authenticationStyles.inputFieldError}`}>
              {emailError}
            </p>
          </div>

          <div>
            <div className={`${authenticationStyles.labelContainer}`}>
              <span className={`${authenticationStyles.label}`}>Password</span>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className={`${authenticationStyles.inputField} ${
                  invalidPassword
                    ? "ring-red-500 text-red-500"
                    : "ring-gray-300"
                }`}
              />
            </div>
            <p className={`${authenticationStyles.inputFieldError}`}>
              {passwordError}
            </p>
            <div className="text-sm mt-3 text-end">
              <Link
                to={"/forgot-password"}
                className="font-semibold text-[#548C53] hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className={`${authenticationStyles.button}`}>
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to={"/signup"}
            className="font-semibold text-[#548C53] hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
