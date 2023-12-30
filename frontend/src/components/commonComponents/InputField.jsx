import React from "react";
import { useFormContext } from "react-hook-form";

const InputField = ({
  label,
  type,
  // maxLength,
  // minLenght,
  name,
  placeholder,
  required,
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
        type={type}
        id={name}
        name={name}
        // maxLength={type === "number" ? maxLength : ""}
        // minLength={type === "number" ? minLenght : ""}
        placeholder={placeholder}
        className={`w-full h-[40px] border border-gray-900  p-2 rounded-md ${
          errors[name] && "border-red-500"
        }`}
        {...register(name, { required })}
        {...rest}
      />
      {errors[name] && (
        <p className="text-red-500 text-start text-sm mt-1">{`${label} is required`}</p>
      )}
    </div>
  );
};

export default InputField;
