import React from 'react'

const Button = ({
  label,
  type = "add",
  onClick,
  className = "",
  icon=""
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <button className={`bg-taski-background rounded-md p-1 border-2 hover: cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 text-taski-text-title flex items-center gap-2 w-fit mx-auto
        ${type === 'delete' ? 'hover:border-taski-alert hover:text-taski-alert' : 'hover:border-taski-secondary hover:text-taski-secondary'}
        `} onClick={() => setCount((count) => count + 1)}>
          {label}
          {icon && icon}
        </button>
    </div>
  );
};

export default Button;