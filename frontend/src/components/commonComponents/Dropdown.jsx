import React from "react";
import Select from "react-select";
import { useFormContext } from "react-hook-form";

const Dropdown = ({
  label,
  type,
  searchable,
  name,
  options,
  placeholder,
  ...rest
}) => {
  const { register, setValue, trigger, formState } = useFormContext();
  const { errors } = formState;

  const handleChange = (selectedOptions) => {
    const selectedValues = Array.isArray(selectedOptions)
      ? selectedOptions.map((option) => option.value)
      : selectedOptions.value;

    setValue(name, selectedValues);
    trigger(name);
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        id={name}
        options={options}
        placeholder={placeholder}
        {...register(name, { required: `${label} is required` })}
        onChange={handleChange}
        className={`${type} text-start`}
        {...rest}
        isMulti={type === "basic-multi-select" ? true : false}
        isSearchable={searchable ? true : false}
      />
      {errors[name] && (
        <p className="text-red-500 text-start text-sm mt-1">
          {label} is required
        </p>
      )}
    </div>
  );
};

export default Dropdown;
