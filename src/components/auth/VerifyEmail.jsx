import { useState, useEffect, useRef } from "react";
import { Loader, Success, Error } from "../common/Animations";
import { useLanguage } from "../../hooks/common/useLanguage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../../hooks/auth/useVerifyEmail";
import { Navigate } from "react-router-dom";

function VerifyEmail() {
  const { text } = useLanguage();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { status, errors, verify } = useVerifyEmail();
  const [verified, setVerified] = useState(false);
  const hasVerified = useRef(false);


  useEffect(() => {
    let timer;

    if (token && !hasVerified.current) {
      hasVerified.current = true;
      verify(token);
    }

    if (status === "success") {
      timer = setTimeout(() => navigate("/"), 8000);
    }

    return () => clearTimeout(timer);
  }, [token, verify, status, navigate]);


  return (
    <div className="bg-taski-card rounded-2xl p-4 shadow flex flex-col gap-2 max-w-md mx-auto mt-10">
      <h1 className="text-taski-text-title font-bold p-4">{text.welcome}</h1>
      <div className="w-full flex flex-col items-center gap-2 mt-4 whitespace-pre-line">
        {!token ? (
          <>
            <p>{text.noToken}</p>
            <Error />
          </>
        ) : status === "checking" ? (
          <>
            <p>{text.verifyingEmail}</p>
            <Loader />
          </>
        ) : status === "success" ? (
          <>
            <p>{text.verifySuccess}</p>
            <Success />
          </>
        ) : (
          <>
            <p>{errors.general}</p>
            <Error />
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
