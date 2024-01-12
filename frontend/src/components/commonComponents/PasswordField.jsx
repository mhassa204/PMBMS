import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordField = ({
  label,
  name,
  required,
  minLength,
  maxLength,
  placeholder,
  onKeyDown,
  ...rest
}) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const handleKeyDown = (e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-full border p-2 rounded ${
            errors[name] && "border-red-500"
          }`}
          {...register(name, {
            required,
            minLength: minLength ? minLength : undefined,
            maxLength: maxLength ? maxLength : undefined,
          })}
          onKeyDown={handleKeyDown}
          {...rest}
        />
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </button>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-start text-sm mt-1">
          {`${label} is required`}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
