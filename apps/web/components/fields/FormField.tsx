import React from "react";

interface FormFieldProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="mb-1 font-medium text-primary-muted">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="none"
        className="text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 "
      />
    </div>
  );
};

export default FormField;
