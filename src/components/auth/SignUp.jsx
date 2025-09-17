import Input from "../common/Input";
import Button from "../common/Button";
import { EmailIcon, IdIcon, LoginIcon, PassIcon } from "../../assets/icons";
import {
  validateConfirmPassword,
  validateEmail,
  validateLoginPassword,
  validatePassword,
  validateUsername,
} from "../../utils/inputValidators";
import { useLogin } from "../../hooks/auth/useLogin";
import { useState, useEffect } from "react";

function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, errors: loginErrors, loading, login } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = (form) => {
    const newErrors = {};
    const emailErrors = validateEmail(form.email);
    if (emailErrors.length > 0) newErrors.email = emailErrors.join(", ");
    const passwordErrors = validatePassword(form.password);
    if (passwordErrors.length > 0)
      newErrors.password = passwordErrors.join(" \n ");
    const userNameErrors = validateUsername(form.username);
    if (userNameErrors.length > 0)
      newErrors.username = userNameErrors.join(", ");
    const confirmPassErrors = validateConfirmPassword(
      form.password,
      form.confirm
    );
    if (confirmPassErrors.length > 0)
      newErrors.confirm = confirmPassErrors.join(", ");
    return newErrors;
  };

  useEffect(() => {
    setFormErrors(validate(form));
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (Object.keys(formErrors).length === 0) {
      try {
        //const data = await login(form);
        console.log("Envia request: ");
        setSuccess(true);
      } catch (err) {
        console.error("no envia request: ");
        setSuccess(false);
      }
    }
  };

  const hasErrors = Object.keys(formErrors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center px-4">
      <div className="bg-taski-card rounded-2xl p-6 flex flex-col gap-4 w-full sm:max-w-md">
        <h1 className="text-taski-text-title font-bold text-xl sm:text-2xl text-center">
          Welcome to Taski!
        </h1>

        <div className="flex flex-col gap-3">
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Jhon Doe"
            error={submitted ? formErrors.username : ""}
            icon={IdIcon}
            disabled={success}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            error={submitted ? formErrors.email : ""}
            icon={EmailIcon}
            disabled={success}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            variant="change"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            error={formErrors.password}
            icon={PassIcon}
            disabled={success}
          />
          <Input
            label="Confirm Password"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="********"
            error={form.confirm.length > 0 ? formErrors.confirm : ''}
            icon={PassIcon}
            disabled={success}
          />
        </div>

        <Button
          label={loading ? "Registering..." : "Register"}
          type="submit"
          icon={LoginIcon}
          disabled={
            hasErrors ||
            loading ||
            success ||
            (hasErrors && form.confirm.length > 0)
          }
        />

        {success && (
          <div>
            <p className="text-taski-secondary text-sm text-center mt-2">
              Se ha enviado al correo electrónico ingresado un enlace de
              verificación para terminar el registro.
              Si no lo ves, revisa el buzón de Spam antes de reenviar el enlace.
            </p>
            <p className="text-taski-warning text-xs text-center mt-2 underline hover:cursor-pointer hover:scale-105 transition-all 
          duration-300 ">
              Reenviar enlace.
            </p>
          </div>
        )}

        {loginErrors && (
          <p className="text-taski-alert text-sm text-center mt-2">
            {loginErrors.general}
          </p>
        )}
      </div>
    </form>
  );
}

export default SignUp;
