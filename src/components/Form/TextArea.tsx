import React from "react";

const TextArea: React.FC<{ id: string; rows?: number; labelText?: string; placeholder?: string }> = ({
  id,
  rows = 4,
  labelText = "Your message",
  placeholder = "Write your message here",
}) => {
  return (
    <div className="p-7">
      <label
        htmlFor={id}
        className="block mb-2 text-base font-normal text-black-900 "
      >
        {labelText}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="block p-2.5 w-full text-sm text-gray-900 bg-white-50 rounded-md border border-gray-300 focus:outline-none focus:ring-1"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
