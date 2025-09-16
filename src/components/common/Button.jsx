import React from "react";

const Button = ({
  label,
  type = "button",
  variant = "add",
  onClick,
  className = "",
  icon = "",
  disabled = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <button
        className={`
          bg-taski-background 
          rounded-md 
          p-1 
          border-2 
          transition-all 
          duration-300 
          flex items-center gap-2 w-fit mx-auto
          ${
            disabled
              ? "disable-style"
              : "cursor-pointer hover:scale-105 hover:shadow-lg " +
                (variant === "delete"
                  ? "hover:border-taski-alert hover:text-taski-alert"
                  : variant === "warning"
                  ? "hover:border-taski-warning hover:text-taski-warning"
                  : "hover:border-taski-secondary hover:text-taski-secondary")
          }
          text-taski-text-title
        `}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {label}
        {icon && icon}
      </button>
    </div>
  );
};

export default Button;
