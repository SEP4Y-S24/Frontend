import React from "react";

const InputField: React.FC<{
  id?: string;
  labelText?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  type?: string;
  isRequired?: boolean;
  value?: any;
  name?: string;
  onChange?: any;
}> = ({
  id,
  labelText = "Label",
  placeholder = "",
  className = "",
  value,
  type = "text",
  error = "",
  isRequired = false,
  name,
  onChange,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-base font-normal text-dark"
      >
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        className="block p-2.5 w-full text-sm text-primaryText bg-white-50 rounded-md border border-stroke focus:outline-none focus:ring-1"
        placeholder={placeholder}
        type={type}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
      <span className="text-danger text-sm">{error}</span>
    </div>
  );
};

export default InputField;
