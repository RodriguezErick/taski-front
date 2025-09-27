import Input from "../common/Input";
import Button from "../common/Button";
import { EmailIcon, IdIcon, LoginIcon, PassIcon } from "../../assets/icons";
import { validateEmail } from "../../utils/inputValidators";
import { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/common/useLanguage";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";

function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sent, setSent] = useState(false);

  const { errors, loading, forgot } = useForgotPassword();
  const { text } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = (form) => {
    const newErrors = {};
    const emailErrors = validateEmail(form.email, text);
    if (emailErrors.length > 0) newErrors.email = emailErrors.join(", ");
    return newErrors;
  };

  useEffect(() => {
    setFormErrors(validate(form));
  }, [form, text]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(formErrors).length === 0) {
      sendForgot();
    }
  };

  const sendForgot = async () => {
    try {
      const data = await forgot(form);
      console.log("Envia request");
      setSuccess(true);
    } catch (err) {
      console.error("No envia request");
      setSuccess(false);
    }
  };

  const handleResend = async () => {
    if (loading || sent) return;
    setSent(true);
    sendForgot();
  };

  const hasErrors = Object.keys(formErrors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center px-4">
      <div className="bg-taski-card rounded-2xl p-6 flex flex-col gap-4 w-full sm:max-w-md">
        <h1 className="text-taski-text-title font-bold text-xl sm:text-2xl text-center">
          {text.resetPassword}
        </h1>

        <div className="flex flex-col gap-3">
          <Input
            label={text.email}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={text.emailPlaceholder}
            error={submitted ? formErrors.username : ""}
            icon={EmailIcon}
            disabled={success}
          />
        </div>

        <Button
          label={loading ? text.submitting : text.submit}
          type="submit"
          icon={LoginIcon}
          disabled={hasErrors || loading || success}
        />

        {success && (
          <div>
            <p className="text-taski-secondary text-sm text-center mt-2 whitespace-pre-line">
              {text.forgotSuccess}
            </p>
            <p
              className={`text-taski-warning text-xs text-center mt-2 underline transition-all duration-300 ${
                loadingResend || sent
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:cursor-pointer hover:scale-105"
              }`}
              onClick={!loading && !sent ? handleResend : undefined}
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
      </div>
    </form>
  );
}

export default ForgotPassword;
