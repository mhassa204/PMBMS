import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageField = ({ label, name, required, ...rest }) => {
  const { register, setValue, formState, clearErrors } = useFormContext();
  const { errors } = formState;

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    setValue(name, file);
    clearErrors(name);
  };
  return (
    <div className="mb-4 flex items-start flex-column ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        id={name}
        {...register(name, { required: `${label} is required` })}
        onChange={handleChange}
        {...rest}
        className="py-1 hover:cursor-pointer"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Selected"
          className="mt-2 max-h-40 object-contain"
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-start text-sm mt-1">
          {label} is required
        </p>
      )}
    </div>
  );
};

export default ImageField;
