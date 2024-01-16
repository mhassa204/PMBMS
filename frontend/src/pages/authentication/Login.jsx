import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateEmail, validatePassword } from "../../utils/Validations";

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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setInvalidEmail(true);
      setEmailError("Invalid email");
    } else {
      setInvalidEmail(false);
      setEmailError("");
    }
    if (!validatePassword(password)) {
      setInvalidPassword(true);
      setPasswordError("Password should be 8-25 characters long");
    } else {
      setInvalidPassword(false);
      setPasswordError("");
    }
    if (validateEmail(email) && validatePassword(password)) {
      await axios
        .post("http://localhost:3000/users/login", {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("auth", JSON.stringify(res.data.auth));
          navigate("/admin/dashboard");

          console.log("user registered successfully", res);
        })
        .catch((err) => {
          console.log(
            "Could not registered user",
            err,
            err.response.data.message
          );
          if (err.response.data.message === "Invalid password") {
            setInvalidPassword(true);
            setPasswordError(err.response.data.message);
          }
          if (err.response.data.message === "Invalid email") {
            setInvalidEmail(true);
            setEmailError(err.response.data.message);
          }
          if (err.response.data.message === "User already exists") {
            setInvalidEmail(true);
            setEmailError(err.response.data.message);
          }
          if (err.response.data.message === "Please fill all fields") {
            setInvalidEmail(true);
            setEmailError(err.response.data.message);
            setInvalidPassword(true);
            setPasswordError(err.response.data.message);
          }
        });
    }
  };

  const styles = {
    userTypeStyle: `flex py-2 w-[48%] border-1 justify-content-center align-items-center`,
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md my-5 p-8 bg-white rounded login-container">
        <div className="text-center">
          {/* <img
            className="mx-auto h-20"
            src={process.env.PUBLIC_URL + "/logo-talenthunt.png"}
            alt="Your Company"
          /> */}
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Create your account
          </h2>
        </div>

        <form
          className="mt-6 space-y-4"
          action="#"
          onSubmit={handleSignup}
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
                  invalidEmail
                    ? "ring-red-500 text-red-500 focus:ring-red-600"
                    : "ring-gray-300 focus:ring-indigo-600"
                }`}
              />
            </div>
            <p className="text-start text-red-500 text-sm">{emailError}</p>
          </div>

          <div className="">
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
                    ? "ring-red-500 text-red-500 focus:ring-red-600"
                    : "ring-gray-300 focus:ring-indigo-600"
                }`}
              />
            </div>
            <div className="flex items-between mt-1">
              {passwordError !== "" ? (
                <p className="text-start text-red-500 text-sm ">
                  {passwordError}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <button type="submit" className={`${authenticationStyles.button}`}>
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to={"/signup"}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
