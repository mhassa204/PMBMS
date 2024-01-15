import React from "react";
import Select from "react-select";
import { useFormContext } from "react-hook-form";

const Dropdown = ({
  label,
  type,
  defaultValue,
  required,
  searchable,
  placeholder,
  handleChange,
  name,
  options,
  onKeyDown,
  ...rest
}) => {
  const { register, setValue, trigger, formState } = useFormContext();
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
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        id={name}
        options={options}
        placeholder={placeholder}
        {...register(name, { required: `${label} is required ` })}
        onChange={(selectedOptions) => {
          const selectedValues = Array.isArray(selectedOptions)
            ? selectedOptions.map((option) => option.value)
            : selectedOptions.value;

          setValue(name, selectedValues);
          trigger(name);
          handleChange && handleChange({ name: name, value: selectedValues });
        }}
        className={`${type} text-start h-[40px] `}
        onKeyDown={handleKeyDown}
        {...rest}
        defaultValue={defaultValue}
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
