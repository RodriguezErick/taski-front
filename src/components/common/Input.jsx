import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  variant = "",
  value,
  onChange,
  placeholder = "",
  error,
  className = "",
  icon = "",
  disabled = false
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-taski-text-title mb-1 text-left block pl-2"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center w-full rounded-md border-2 transition-all text-taski-text-title duration-300${
          error ? "border-taski-alert" : "border-taski-placeholder"
        } ${disabled ? "disable-style" : ""} focus-within:ring-1 focus-within:ring-taski-text`}
      >
        {icon && (
          <span className="px-3 py-2 bg-taski-card flex items-center rounded-md shadow">
            {icon}
          </span>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 px-3 py-2 bg-taski-background text-taski-text placeholder-taski-placeholder focus:outline-none rounded-r-md"
        />
      </div>

      {error && <p className={`mt-1 text-sm whitespace-pre-line text-left pl-4 ${variant === "change" ? "text-taski-warning" : "text-taski-alert"}`}>{error}</p>}
    </div>
  );
};

export default Input;
