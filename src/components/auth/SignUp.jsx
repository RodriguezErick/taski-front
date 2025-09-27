import Input from "../common/Input";
import Button from "../common/Button";
import { EmailIcon, IdIcon, LoginIcon, PassIcon } from "../../assets/icons";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/inputValidators";
import { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/common/useLanguage";
import { useSignUp } from "../../hooks/auth/useSignUp";
import { useResendVerification } from "../../hooks/auth/useResendVerification";

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

  const {
    errors: resendErrors,
    loading: loadingResend,
    sent,
    resendVerification,
  } = useResendVerification();

  const { errors, loading, signUp } = useSignUp();
  const { text } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = (form) => {
    const newErrors = {};
    const emailErrors = validateEmail(form.email, text);
    if (emailErrors.length > 0) newErrors.email = emailErrors.join(", ");
    const passwordErrors = validatePassword(form.password, text);
    if (passwordErrors.length > 0)
      newErrors.password = passwordErrors.join(" \n ");
    const userNameErrors = validateUsername(form.username, text);
    if (userNameErrors.length > 0)
      newErrors.username = userNameErrors.join(", ");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(formErrors).length === 0) {
      try {
        const data = await signUp({
          username: form.username,
          email: form.email,
          password: form.password,
        });
        console.log("Envia request: ");
        setSuccess(true);
      } catch (err) {
        console.error("no envia request: ");
        setSuccess(false);
      }
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      try {
        const data = await resendVerification({
          email: form.email,
        });
        console.log("Envia request: ");
      } catch (err) {
        console.error("no envia request: ");
      }
    }
  };

  const hasErrors = Object.keys(formErrors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center px-4">
      <div className="bg-taski-card rounded-2xl p-6 flex flex-col gap-4 w-full sm:max-w-md">
        <h1 className="text-taski-text-title font-bold text-xl sm:text-2xl text-center">
          {text.createAccount}
        </h1>

        <div className="flex flex-col gap-3">
          <Input
            label={text.userName}
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder={text.userNamePlaceholder}
            error={submitted ? formErrors.username : ""}
            icon={IdIcon}
            disabled={success}
          />
          <Input
            label={text.email}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={text.emailPlaceholder}
            error={submitted ? formErrors.email : ""}
            icon={EmailIcon}
            disabled={success}
          />
          <Input
            label={text.password}
            name="password"
            type="password"
            variant="change"
            value={form.password}
            onChange={handleChange}
            placeholder={text.passwordPlaceholder}
            error={formErrors.password}
            icon={PassIcon}
            disabled={success}
          />
          <Input
            label={text.confirmPassword}
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder={text.passwordPlaceholder}
            error={form.confirm.length > 0 ? formErrors.confirm : ""}
            icon={PassIcon}
            disabled={success}
          />
        </div>

        <Button
          label={loading ? text.registering : text.register}
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
            <p className="text-taski-secondary text-sm text-center mt-2 whitespace-pre-line">
              {text.signUpSuccess}
            </p>
            <p
              className={`text-taski-warning text-xs text-center mt-2 underline transition-all duration-300 ${
                loadingResend || sent
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:cursor-pointer hover:scale-105"
              }`}
              onClick={!loadingResend && !sent ? handleResend : undefined}
            >
              {text.resendLink}
            </p>
          </div>
        )}

        {errors && (
          <p className="text-taski-alert text-sm text-center mt-2">
            {errors.general}
          </p>
        )}
        {resendErrors && (
          <p className="text-taski-alert text-sm text-center mt-2">
            {resendErrors.general}
          </p>
        )}
      </div>
    </form>
  );
}

export default SignUp;
