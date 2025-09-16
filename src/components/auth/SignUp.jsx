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
  const [form, setForm] = useState({ username:"", email: "", password: "", confirm: ""});
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    const confirmPassErrors = validateConfirmPassword(form.password, form.confirm);
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
      } catch (err) {
        console.error("no envia request: ");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-taski-card rounded-2xl p-4 shadow flex flex-col gap-2">
        <h1 className="text-taski-text-title font-bold p-4">
          Welcome to Taski!
        </h1>
        <div className="w-full max-w-3/4 mx-auto">
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Jhon Doe"
            error={submitted ? formErrors.username : ""}
            icon={IdIcon}
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
          />
          <Input
            label="Confirm Password"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="********"
            error={formErrors.confirm}
            icon={PassIcon}
          />

          <Button
            label={loading ? "Registering..." : "Register"}
            type="submit"
            icon={LoginIcon}
            disabled={Object.keys(formErrors).length > 0 || loading}
          />

          {loginErrors && (
            <p className="text-taski-alert text-sm mt-2">
              {loginErrors.general}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

export default SignUp;
