import React from "react";
import { useFormContext } from "react-hook-form";

const DateField = ({ label, name, required, value, onKeyDown, ...rest }) => {
  const { register, setValue, trigger, formState } = useFormContext();
  const { errors } = formState;

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(name, e.target.value);
    trigger(name);
  };

  const handleKeyDown = (e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  // console.log(value);

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
        onKeyDown={handleKeyDown}
        {...rest}
        value={value && value}
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
