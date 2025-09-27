import { useState } from "react";
import { resetPassword as resetApi } from "../../api/auth";

export const useResetPassword = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const reset = async (form) => {
    try {
      setLoading(true);
      const data = await resetApi(form);
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

  return { errors, loading, reset };
};
