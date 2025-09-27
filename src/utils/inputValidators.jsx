import REACT from "react";

export const validatePassword = (password, text) => {
  const errors = [];
  if (password.length < 8) {
    errors.push(text.min8characters);
  }
  if (!/[A-Z]/.test(password)) {
    errors.push(text.minOneUpperCase);
  }
  if (!/[a-z]/.test(password)) {
    errors.push(text.minOneLowerCase);
  }
  if (!/[0-9]/.test(password)) {
    errors.push(text.minOneNumber);
  }
  return errors;
};

export const validateConfirmPassword = (password, confirmPassword, text) => {
  const errors = [];
  if (password !== confirmPassword){
    errors.push(text.passwordNotMatch);
  }
  return errors;
};

export const validateLoginPassword = (password, text)  => {
  const errors = [];
  if (password.length < 8) {
    errors.push(text.min8characters);
  }
  return errors;
};

export const validateEmail = (email, text) => {
    const errors = [];
    if (!email.trim()) {
      errors.push(text.emailRequired);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push(text.invalidEmail);
    }
    return errors;
};

export const validateUsername = (username, text) => {
  const errors = [];
  if (username.length > 50 || username.length < 3){
    errors.push(text.username3to50)
  }
  return errors;
}