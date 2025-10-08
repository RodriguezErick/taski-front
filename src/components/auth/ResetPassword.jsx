import { useState, useEffect } from "react";
import { Loader, Success, Error } from "../common/Animations";
import { useLanguage } from "../../hooks/common/useLanguage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import {
  validateConfirmPassword,
  validatePassword
} from "../../utils/inputValidators";
import Input from "../common/Input";
import { PassIcon, LoginIcon } from "../../assets/icons";
import Button from "../common/Button";
import { Navigate } from "react-router-dom";

function ResetPassword() {
  const [form, setForm] = useState({
    password: "",
    confirm: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const { text } = useLanguage();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const navigate = useNavigate();

  const { errors, loading, reset } = useResetPassword();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(formErrors).length === 0) {
      try {
        await reset({
            token: tokenFromUrl,
            newPassword: form.password
        });
        console.log("Envia request: ");
        setSuccess(true);
      } catch (err) {
        console.error("no envia request: ");
        setSuccess(false);
      }
    }
  };

  const validate = (form) => {
      const newErrors = {};
      const passwordErrors = validatePassword(form.password, text);
      if (passwordErrors.length > 0)
        newErrors.password = passwordErrors.join(" \n ");
      const confirmPassErrors = validateConfirmPassword(
        form.password,
        form.confirm,
        text
      );
      if (confirmPassErrors.length > 0)
        newErrors.confirm = confirmPassErrors.join(", ");
      return newErrors;
    };

  useEffect(() => {
    setFormErrors(validate(form));
  }, [form, text]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/"), 8000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const hasErrors = Object.keys(formErrors).length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-taski-card rounded-2xl p-4 shadow flex flex-col gap-2 items-center">
        <h1 className="text-taski-text-title font-bold p-4">{text.welcome}</h1>
        {!tokenFromUrl ? (
          <>
            <p>{text.noToken}</p>
            <Error />
          </>

        ) : !success ? (
          <div className="w-full max-w-3/4 mx-auto">
            <Input
              label={text.password}
              name="password"
              type="password"
              variant="change"
              value={form.password}
              onChange={handleChange}
              placeholder={text.passwordPlaceholder}
              error={submitted ? formErrors.password : ""}
              icon={PassIcon}
              disabled={loading}
            />

            <Input
              label={text.confirmPassword}
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              placeholder={text.passwordPlaceholder}
              error={submitted && form.confirm.length > 0 ? formErrors.confirm : ""}
              icon={PassIcon}
              disabled={loading}
            />

            <Button
              label={loading ? text.updating : text.update}
              type="submit"
              icon={LoginIcon}
              disabled={hasErrors || loading}
            />

            {submitted && errors && (
              <p className="text-taski-alert text-sm mt-2">{errors.general}</p>
            )}
          </div>

        ) : (
          <>
            <p>{text.passwordSuccess}</p>
            <Success />
          </>
        )}
      </div>
    </form>
  );
}

export default ResetPassword;
