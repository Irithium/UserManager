export const validateName = (name) => {
  if (name.trim() === "") {
    return "Name is required.";
  } else return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  } else return "";
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return "The password has to be more than 6 characters.";
  } else return "";
};
