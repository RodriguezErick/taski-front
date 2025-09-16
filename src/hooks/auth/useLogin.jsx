import { useState } from "react";
import { login as loginApi} from "../../api/auth";


export const useLogin = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const login = async (form) => {
    try {
      setLoading(true);
      const data = await loginApi(form); 
      setUser(data.user);
      setErrors({});
      return data;
    } catch (err) {
        const normalized = err?.message ? {general: err.message} :
      typeof err === "object" && err !== null
    ? err
    : { general: "Unknown error" };

  setErrors(normalized);
  throw normalized;
    } finally {
      setLoading(false);
    }
  };

  return { user, errors, loading, login };
};