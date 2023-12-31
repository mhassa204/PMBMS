import React from "react";
import { useFormContext } from "react-hook-form";

const DateField = ({ label, name, required, ...rest }) => {
  const { register, setValue, trigger, formState } = useFormContext();
  const { errors } = formState;

  const handleChange = (e) => {
    setValue(name, e.target.value);
    trigger(name);
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
        type="date"
        id={name}
        {...register(name, { required: `${label} is required` })}
        onChange={handleChange}
        {...rest}
        className="border rounded-md px-3 py-2 w-full text-start"
      />
      {errors[name] && (
        <p className="text-red-500 text-start text-sm mt-1">
          {label} is required
        </p>
      )}
    </div>
  );
};

export default DateField;