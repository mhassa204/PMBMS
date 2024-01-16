import React, { useEffect, useState } from "react";

const SimpleInputField = ({
  label,
  value,
  type,
  name,
  buttonType,
  buttonName,
  required,
  placeholder,
  handleChange,
  error,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const [val, setVal] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    setVal({
      name: value.name,
      id: value.id,
    });
  }, [value]);

  return (
    <div className="flex items-cer">
      <div>
        <input
          type={type || "text"}
          id={name}
          name={name}
          value={val.name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            e.preventDefault();
            setVal({ id: value.id, name: e.target.value });
          }}
          className={`w-full h-[40px] border-1 border-gray-900  p-2 rounded-md ${
            error && "border-red-500"
          }`}
        />
        {error && (
          <p className="text-red-500 text-start text-sm mt-1">
            {`${label} is required`}
          </p>
        )}
      </div>
      <div className="ms-3 flex items-end">
        <button
          type={buttonType ? buttonType : ""}
          onClick={(e) => handleChange(val)}
          className="bg-[#0b6323] h-[40px] hover:bg-darkblue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default SimpleInputField;
