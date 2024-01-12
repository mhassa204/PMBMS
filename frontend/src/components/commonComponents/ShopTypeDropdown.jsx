import React from "react";
import Select from "react-select";
import { useFormContext } from "react-hook-form";

const ShopTypeDropdown = ({
  label,
  required,
  placeholder,
  handleChange,
  onKeyDown,
  name,
  options,
}) => {
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleChange1 = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.value : "";

    setValue(name, selectedValues);
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

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Select
        id={name}
        options={options}
        placeholder={placeholder}
        className="text-start h-[40px]"
        {...register(name, { required: `${label} is required` })}
        onKeyDown={handleKeyDown}
        onChange={(selectedOption) => {
          handleChange(selectedOption);
          handleChange1(selectedOption);
        }}
      />

      {errors[name] && (
        <p className="text-red-500 text-start text-sm mt-1">
          {label} is required
        </p>
      )}
    </div>
  );
};

export default ShopTypeDropdown;
