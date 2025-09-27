import { useState, useEffect } from "react";
import { Loader, Success, Error } from "../common/Animations";
import { useLanguage } from "../../hooks/common/useLanguage";
import { useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../../hooks/auth/useVerifyEmail";

function VerifyEmail() {
  const { text } = useLanguage();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { status, errors, verify } = useVerifyEmail();


  useEffect(() => {
    if (!token) {
      return;
    } else {
      verify(token);
    }
  }, [token, text]);

  return (
    <div className="bg-taski-card rounded-2xl p-4 shadow flex flex-col gap-2 max-w-md mx-auto mt-10">
      <h1 className="text-taski-text-title font-bold p-4">{text.welcome}</h1>
      <div className="w-full flex flex-col items-center gap-2 mt-4">
        {!token ? (
          <>
            <p>❌ No se proporcionó un token válido.</p>
            <Error />
          </>
        ) : status === "checking" ? (
          <>
            <p>Verificando tu cuenta...</p>
            <Loader />
          </>
        ) : status === "success" ? (
          <>
            <p>✅ Tu correo ha sido verificado correctamente.</p>
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
