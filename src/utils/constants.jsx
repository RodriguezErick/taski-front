import loginImage from "../assets/login-image.png";

export const APP_NAME = "Taski";

export const loginBackgroundStyle = {
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
};
