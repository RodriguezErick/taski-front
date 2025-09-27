import { useState } from "react";
import { forgotPassword as forgotApi } from "../../api/auth";

export const useForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const forgot = async (form) => {
    try {
      setLoading(true);
      const data = await forgotApi(form);
      setErrors({});
      return data;
    } catch (err) {
      const normalized = err?.message
        ? { general: err.message }
        : typeof err === "object" && err !== null
        ? err
        : { general: "Unknown error" };

      setErrors(normalized);
      throw normalized;
    } finally {
      setLoading(false);
    }
  };

  return { errors, loading, forgot };
};
