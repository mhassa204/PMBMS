import React from "react";
import { useFormContext } from "react-hook-form";

const InputField = ({
  label,
  type,
  name,
  required,
  placeholder,
  pattern,
  ...rest
}) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type || "text"}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`w-full border p-2 rounded ${
          errors[name] && "border-red-500"
        }`}
        {...register(name, { required, pattern })}
        {...rest}
      />
      {errors[name] && (
        <p className="text-red-500 text-start text-sm mt-1">
          {errors[name].type === "required"
            ? `${label} is required`
            : errors[name].message}
        </p>
      )}
    </div>
  );
};

export default InputField;
