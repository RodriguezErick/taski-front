import Input from "../common/Input";
import Button from "../common/Button";
import { EmailIcon, LoginIcon, PassIcon } from "../../assets/icons";
import {
  validateEmail,
  validateLoginPassword,
} from "../../utils/inputValidators";
import { useLogin } from "../../hooks/auth/useLogin";
import { useState, useEffect } from "react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
    const passwordErrors = validateLoginPassword(form.password);
    if (passwordErrors.length > 0)
      newErrors.password = passwordErrors.join(", ");
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
        const data = await login(form);
        console.log("Login exitoso: ", data);
      } catch (err) {
        console.error("Error en login: ", err);
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
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            error={submitted ? formErrors.password : ""}
            icon={PassIcon}
          />

          <Button
            label={loading ? "Loging in..." : "Log In"}
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

export default Login;
