import Login from "../../components/auth/Login";
import loginImage from "../../assets/login-image.png";
import { useState } from "react";
import { CloseIcon } from "../../assets/icons";
import { useLanguage } from "../../hooks/common/useLanguage";
import { loginBackgroundStyle } from "../../utils/constants";
import VerifyEmail from "../../components/auth/VerifyEmail";

function VerifyEmailPage() {
  const { text } = useLanguage();
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="hidden md:block absolute inset-0"
        style={loginBackgroundStyle}
      />

      <div className="relative z-10 flex min-h-screen">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <VerifyEmail /> 
          </div>
        </div>
        <div className="hidden md:flex flex-1"></div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
