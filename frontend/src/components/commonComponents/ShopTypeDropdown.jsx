import React from "react";
import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";

const ShopTypeDropdown = ({
  label,
  required,
  placeholder,

  name,
  options,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required && ` ${label} is required` }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            className="text-start h-[40px]"
            onChange={(selectedOption) => field.onChange(selectedOption.value)}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-start text-sm mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default ShopTypeDropdown;
