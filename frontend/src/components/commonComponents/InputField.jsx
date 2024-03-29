import React from "react";
import { useFormContext } from "react-hook-form";

const InputField = ({
  label,
  value,
  type,
  name,
  required,
  placeholder,
  pattern,
  min,
  max,
  handleChange,
  disabled,
  onKeyDown,
  ...rest
}) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

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
      <input
        type={type || "text"}
        id={name}
        name={name}
        // value={value}
        value={value !== undefined ? String(value) : undefined}
        placeholder={placeholder}
        min={min && min}
        max={max && max}
        onKeyDown={handleKeyDown}
        // onChange={(e) => {
        //   handleChange && handleChange(e);
        // }}
        disabled={disabled}
        className={`w-full h-[40px] border border-gray-900  p-2 rounded-md ${
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
