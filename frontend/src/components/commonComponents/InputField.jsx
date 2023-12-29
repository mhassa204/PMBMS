import React from "react";
import { useFormContext } from "react-hook-form";

const InputField = ({ label, type, name, required, ...rest }) => {
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
        className={`w-full border p-2 rounded ${
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
