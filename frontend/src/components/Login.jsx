import React, { useState } from "react";
import { login } from "../services/auth";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../utils/validation";
import { Link, redirect } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationMessages, setValidationMessages] = useState({
    email: null,
    password: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setValidationMessages({
        ...validationMessages,
        email: validateEmail(value),
      });
    }
    if (name === "password") {
      setValidationMessages({
        ...validationMessages,
        password: validatePassword(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setValidationMessages({
        email: emailError,
        password: passwordError,
      });
      setError("Please correct the errors in the form.");
      toast.error(error);
      return;
    }

    setError("");

    try {
      const data = await login(formData);

      toast.success("Login successful:", data);
      localStorage.setItem("token", data.token);
      redirect("/users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex lg:flex-col justify-center h-screen bg-gradient-to-br from-peach-400 to-vermilion-500">
      <div className="flex flex-col ml-12 justify-center items-center w-1/4 h-fit py-6 bg-white border border-dim_gray-100 rounded-lg text">
        <h2 className="w-fit my-4  ml-4 px-2 text-2xl text-center font-bold text-dim_gray-200">
          USERMANAGER
        </h2>
        <div className="flex flex-col items-center justify-center text-dim_gray-200 h-full py-2">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col justify-center items-center"
          >
            <div className="flex items-center justify-center my-4 w-1/2">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className={`border-b border-black py-1 focus:border-b-2 focus:border-vermilion-500 transition-colors focus:outline-none peer bg-inherit ${
                    formData.email !== ""
                      ? "border-b-2 border-vermilion-500 outline-none"
                      : ""
                  }`}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-vermilion-400 ${
                    formData.email !== ""
                      ? "text-xs text-vermilion-400 -top-4"
                      : ""
                  }`}
                >
                  Email
                </label>
                {validationMessages.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationMessages.email}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center my-4 w-1/2">
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className={`border-b border-black py-1 focus:border-b-2 focus:border-vermilion-500 transition-colors focus:outline-none peer bg-inherit ${
                    formData.password !== ""
                      ? "border-b-2 border-vermilion-500 outline-none"
                      : ""
                  }`}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-vermilion-400 ${
                    formData.password !== ""
                      ? "text-xs text-vermilion-400 -top-4"
                      : ""
                  }`}
                >
                  Password{" "}
                </label>
                {validationMessages.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationMessages.password}
                  </p>
                )}
              </div>
            </div>
            <button
              className="w-full h-fit relative px-4 py-2 font-semibold rounded-lg text-lg text-white bg-vermilion-500 hover:bg-vermilion-500/90 active:top-px active:bg-vermilion-500 transition-all my-4"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
        <div className="items-center justify-center text-dim_gray-200 pb-4">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold">
            {" "}
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
