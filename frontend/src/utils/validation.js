export const validateName = (name) => {
  if (name.trim() === "") {
    return "Name is required.";
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return "The password has to be more than 6 characters.";
  }
  return null;
};
