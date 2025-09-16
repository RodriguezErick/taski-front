import REACT from "react";

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push("• Debe tener al menos 8 caracteres.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("• Debe tener al menos una letra mayúscula.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("• Debe tener al menos una letra minúscula.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("• Debe tener al menos un número.");
  }
  return errors;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  const errors = [];
  
  if (password !== confirmPassword && confirmPassword.length > 0){
    errors.push("Las contraseñas ingresadas no coinciden.");
  }
  return errors;
};

export const validateLoginPassword = (password)  => {
  const errors = [];
  if (password.length < 8) {
    errors.push("Debe tener al menos 8 caracteres.");
  }
  return errors;
};

export const validateEmail = (email) => {
    const errors = [];
    if (!email.trim()) {
      errors.push("El correo es requerido.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Formato de correo inválido.");
    }
    return errors;
};

export const validateUsername = (username) => {
  const errors = [];
  if (username.length > 50 || username.length < 3){
    errors.push("Username debe ser de entre 3 y 50 caracteres.")
  }
  return errors;
}