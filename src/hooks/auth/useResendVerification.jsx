import { useState } from "react";
import { resendVerificationEmail as resendApi } from "../../api/auth";

export const useResendVerification = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false); 

  const resendVerification = async (form) => {
    try {
      setLoading(true);
      const data = await resendApi(form);
      setErrors({});
      setSent(true); 
      return data;
    } catch (err) {
      const normalized = err?.message
        ? { general: err.message }
        : typeof err === "object" && err !== null
        ? err
        : { general: "Unknown error" };

      setErrors(normalized);
      setSent(false); 
      throw normalized;
    } finally {
      setLoading(false);
    }
  };

  return { errors, loading, sent, resendVerification };
};
