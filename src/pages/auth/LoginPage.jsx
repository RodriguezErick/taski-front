import Login from "../../components/auth/Login";
import loginImage from "../../assets/login-image.png";
import SignUp from "../../components/auth/SignUp";
import { useState } from "react";
import { CloseIcon } from "../../assets/icons";
import ForgotPassword from "../../components/auth/ForgotPassword";
import { useLanguage } from "../../hooks/common/useLanguage";
import { loginBackgroundStyle } from "../../utils/constants";

function LoginPage() {
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [showModalForgot, setShowModalForgot] = useState(false);
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
            <Login />
            <p
              className="text-taski-placeholder p-1 hover:cursor-pointer hover:text-taski-secondary text-center hover:scale-105 transition-all"
              onClick={() => setShowModalSignUp(true)}
            >
              {text.signup}
            </p>
            <p
              className="text-taski-placeholder p-1 hover:cursor-pointer hover:text-taski-warning text-center text-sm hover:scale-105 transition-all"
              onClick={() => setShowModalForgot(true)}
            >
              {text.forgotPassword}
            </p>
          </div>
        </div>

        {showModalSignUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
            <div className="p-4 rounded-3xl shadow-lg relative w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[90vh] overflow-y-auto bg-taski-card">
              <button
                className="w-6 h-6 absolute top-2 right-2 text-taski-text hover:text-taski-alert hover:cursor-pointer rounded-full"
                onClick={() => setShowModalSignUp(false)}
              >
                {CloseIcon}
              </button>

              <SignUp />
            </div>
          </div>
        )}

        {showModalForgot && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
            <div className="p-4 rounded-3xl shadow-lg relative w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[90vh] overflow-y-auto bg-taski-card">
              <button
                className="w-6 h-6 absolute top-2 right-2 text-taski-text hover:text-taski-alert hover:cursor-pointer rounded-full"
                onClick={() => setShowModalForgot(false)}
              >
                {CloseIcon}
              </button>

              <ForgotPassword />
            </div>
          </div>
        )}

        <div className="hidden md:flex flex-1"></div>
      </div>
    </div>
  );
}

export default LoginPage;
