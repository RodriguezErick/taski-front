import { useState } from "react";
import { signUp as signUpApi } from "../../api/auth";

export const useSignUp = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const signUp = async (form) => {
    try {
      setLoading(true);
      const data = await signUpApi(form);
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

  return { errors, loading, signUp };
};
