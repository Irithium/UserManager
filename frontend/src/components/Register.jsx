import React, { useEffect, useState } from "react";
import { register } from "../services/auth";
import toast from "react-hot-toast";
import logoImage from "../assets/image/userManager.png";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";
import ReviewsCarousel from "./Reviews";
import { BiLogIn } from "react-icons/bi";
import FormComponent from "./Form";
import useAuthStore from "../store/authStore";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error: {
      name: "",
      email: "",
      password: "",
      general: "",
    },
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const validate = (name, value) => {
    if (name === "name") return validateName(value);
    if (name === "email") return validateEmail(value);
    if (name === "password") return validatePassword(value);
    return "";
  };

  useEffect(() => {
    if (formData.error.name !== "") {
      setIsDisabled(true);
    } else if (formData.error.password !== "") {
      setIsDisabled(true);
    } else if (formData.error.email !== "") {
      setIsDisabled(true);
    } else setIsDisabled(false);
  }, [formData]);

  const handleSubmit = async (e) => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (nameError || emailError || passwordError) {
      setFormData((prev) => ({
        ...prev,
        error: {
          email: emailError,
          password: passwordError,
          general: "Please correct the errors in the form.",
        },
      }));

      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const data = await register(formData);
      toast.success("Registration successful:", data);
      loginUser(data.token);
      navigate("/users");
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        error: {
          ...prev.error,
          general: err.message,
        },
      }));
      toast.error(err.message);
    }
  };

  return (
    <div className="content-center h-screen bg-gradient-to-br from-peach-400  to-vermilion-500">
      <div className="flex flex-col md:flex-row flex-1 justify-center items-center w-full h-full lg:h-[85%] lg:w-4/5 md:bg-black-100/90 lg:rounded-lg mx-auto overflow-hidden">
        <div className="flex flex-col justify-center w-4/5 md:w-3/5 lg:w-2/5 h-auto md:h-full items-center lg:py-6 bg-white rounded-lg md:rounded-l-none lg:rounded-l-lg py-4">
          <h2 className="md:w-fit px-2 py-4 lg:py-2 text-2xl text-center mx-auto font-bold text-dim_gray-200">
            USERMANAGER
          </h2>
          <div className="flex flex-col items-center justify-center text-dim_gray-200 h-full py-2 w-full">
            {
              <FormComponent
                formData={formData}
                setFormData={setFormData}
                validate={validate}
                onSubmit={handleSubmit}
                isDisabled={isDisabled}
                buttonText="Register"
                error={formData.error.general}
              />
            }
          </div>
          <div className="flex flex-row items-center justify-center text-dim_gray-200 pb-4 mt-2 md:mt-0">
            <p className="px-2">Already have an account? </p>{" "}
            <Link to="/login" className="flex flex-row items-center">
              {" "}
              <BiLogIn /> <p className="font-bold px-1"> Log in</p>
            </Link>
          </div>
        </div>
        <div className="relative hidden md:flex flex-col items-center justify-center w-3/5 h-4/5 lg:py-4 ">
          <img
            src={logoImage}
            alt={logoImage}
            className="absolute w-1/5 -top-12 -right-4"
          />
          <div className="text-gray-100 text-2xl text-center w-3/4 font-semibold leading-relaxed mb-8">
            <div>
              Visualize, manage, and grow: the power of your users in one table
            </div>
            <div className="text-gray-500 text-sm w-3/4 mx-auto font-medium mt-2">
              Transform data into action: simplify user management
            </div>
          </div>

          <ReviewsCarousel />
        </div>
      </div>
    </div>
  );
};

export default Register;
