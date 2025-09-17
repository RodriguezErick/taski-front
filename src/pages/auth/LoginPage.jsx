import Login from "../../components/auth/Login";
import loginImage from "../../assets/login-image.png";
import SignUp from "../../components/auth/SignUp";
import { useState } from "react";
import { CloseIcon } from "../../assets/icons";
import ForgotPassword from "../../components/auth/ForgotPassword";

function LoginPage() {
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [showModalForgot, setShowModalForgot] = useState(false);
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con gradiente/máscara - solo se muestra en md+ */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundPosition: "right",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage:
            "radial-gradient(circle at right center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 50%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          maskImage:
            "radial-gradient(circle at right center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 50%)",
          maskRepeat: "no-repeat",
          maskSize: "cover",
        }}
      />

      {/* Contenido por encima */}
      <div className="relative z-10 flex min-h-screen">
        {/* Contenedor login + signup */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <Login />
            <p
              className="text-taski-placeholder underline p-1 hover:cursor-pointer hover:text-taski-secondary text-center hover:scale-105 transition-all"
              onClick={() => setShowModalSignUp(true)}
            >
              Sign Up
            </p>
            <p
              className="text-taski-placeholder underline p-1 hover:cursor-pointer hover:text-taski-warning text-center text-sm hover:scale-105 transition-all"
              onClick={() => setShowModalForgot(true)}
            >
              Forgot My Password
            </p>
          </div>
        </div>

        {showModalSignUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
            <div className="p-4 rounded-3xl shadow-lg relative w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[90vh] overflow-y-auto bg-taski-card">
              {/* Botón de cerrar */}
              <button
                className="w-6 h-6 absolute top-2 right-2 text-taski-text hover:text-taski-alert hover:cursor-pointer rounded-full"
                onClick={() => setShowModalSignUp(false)}
              >
                {CloseIcon}
              </button>

              {/* Contenido del modal */}
              <SignUp />
            </div>
          </div>
        )}

        {showModalForgot && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
            <div className="p-4 rounded-3xl shadow-lg relative w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[90vh] overflow-y-auto bg-taski-card">
              {/* Botón de cerrar */}
              <button
                className="w-6 h-6 absolute top-2 right-2 text-taski-text hover:text-taski-alert hover:cursor-pointer rounded-full"
                onClick={() => setShowModalForgot(false)}
              >
                {CloseIcon}
              </button>

              {/* Contenido del modal */}
              <ForgotPassword />
            </div>
          </div>
        )}

        {/* Espacio vacío a la derecha, solo en md+ */}
        <div className="hidden md:flex flex-1"></div>
      </div>
    </div>
  );
}

export default LoginPage;
