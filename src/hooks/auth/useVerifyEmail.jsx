import { useState } from "react";
import { verifyEmail as verifyEmailApi } from "../../api/auth";

export const useVerifyEmail = () => {
  const [status, setStatus] = useState("checking");
  const [errors, setErrors] = useState({});

  const verify = async (token) => {
    try {
      setStatus("checking"); 
      const data = await verifyEmailApi(token);
      setStatus("success"); 
      setErrors({});
      return data;
    } catch (err) {
      setStatus("error");
      const normalized = err?.message
        ? { general: err.message }
        : typeof err === "object" && err !== null
        ? err
        : { general: "Unknown error" };

      setErrors(normalized);
      throw normalized;
    } 
  };

  return { status, errors, verify };
};
