import Login from "../../components/auth/Login";
import loginImage from "../../assets/login-image.png";


function LoginPage() {
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
            <p className="text-taski-placeholder underline p-1 hover:cursor-pointer hover:text-taski-secondary text-center">
              Sign Up
            </p>
          </div>
        </div>

        {/* Espacio vacío a la derecha, solo en md+ */}
        <div className="hidden md:flex flex-1"></div>
      </div>
    </div>
  );
}



export default LoginPage;
