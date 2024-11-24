import React, { useState } from "react";
import { register } from "../services/auth";
import toast from "react-hot-toast";
import { Link, redirect } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [validationMessages, setValidationMessages] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      setValidationMessages({
        ...validationMessages,
        name: validateName(value),
      });
    }
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
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (nameError || emailError || passwordError) {
      setValidationMessages({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      setError("Please correct the errors in the form.");
      toast.error(error);
    }
    setError("");
    try {
      const data = await register(formData);
      toast.success("Registration successful:", data);
      redirect("/users");
    } catch (err) {
      setError(err.message);
    }
  };

  console.log(formData.name);
  console.log(formData.email);

  return (
    <div className="flex lg:flex-col justify-center h-screen bg-gradient-to-br from-peach-400  to-vermilion-500 ">
      <div className="flex flex-col ml-12 justify-center items-center w-[30%] h-fit py-6 bg-white border border-dim_gray-100 rounded-lg text">
        <h2 className="w-fit my-4  ml-4 px-2 text-2xl text-center font-bold text-dim_gray-200 ">
          USERMANAGER
        </h2>
        <div className="flex flex-col items-center justify-center text-dim_gray-200 h-full py-2">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col justify-center items-center"
          >
            <div class="flex items-center justify-center my-4 w-1/2">
              <div class="relative">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                  class={`border-b border-black py-1 focus:border-b-2 focus:border-vermilion-500 transition-colors focus:outline-none peer bg-inherit ${
                    formData.name !== ""
                      ? "border-b-2 border-vermilion-500 outline-none"
                      : ""
                  }`}
                />
                <label
                  for="username"
                  class={`absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-vermilion-400 ${
                    formData.name !== ""
                      ? "text-xs text-vermilion-400 -top-4"
                      : ""
                  }`}
                >
                  Name
                </label>
                {validationMessages.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationMessages.name}
                  </p>
                )}
              </div>
            </div>
            <div class="flex items-center justify-center my-4 w-1/2">
              <div class="relative">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  class={`border-b border-black py-1 focus:border-b-2 focus:border-vermilion-500 transition-colors focus:outline-none peer bg-inherit ${
                    formData.email !== ""
                      ? "border-b-2 border-vermilion-500 outline-none"
                      : ""
                  }`}
                />
                <label
                  for="username"
                  class={`absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-vermilion-400 ${
                    formData.email !== ""
                      ? "text-xs text-vermilion-400 -top-4"
                      : null
                  }`}
                >
                  Email
                </label>
                {validationMessages.email && (
                  <p className="text-red-500 text-xs mt-1 ">
                    {validationMessages.email}
                  </p>
                )}
              </div>
            </div>
            <div class="flex items-center justify-center my-4 w-1/2">
              <div class="relative">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  class={`border-b border-black py-1 focus:border-b-2 focus:border-vermilion-500 transition-colors focus:outline-none peer bg-inherit ${
                    formData.password !== ""
                      ? "border-b-2 border-vermilion-500 outline-none"
                      : null
                  }`}
                />
                <label
                  for="username"
                  class={`absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-vermilion-400  ${
                    formData.password !== ""
                      ? "text-xs text-vermilion-400 -top-4"
                      : null
                  }`}
                >
                  Password
                </label>
                {validationMessages.password && (
                  <p className="text-red-500 text-xs mt-1 w-fit ">
                    {validationMessages.password}
                  </p>
                )}
              </div>
            </div>
            <button
              className="w-full h-fit relative  px-4 py-2 font-semibold rounded-lg text-lg text-white bg-vermilion-500 hover:bg-vermilion-500/90 active:top-px active:bg-vermilion-500 transition-all my-4"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
        <div className="items-center justify-center text-dim_gray-200 pb-4">
          Already have an account?{" "}
          <Link to="/login" className="font-bold">
            {" "}
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
