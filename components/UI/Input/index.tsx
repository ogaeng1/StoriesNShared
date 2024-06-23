import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  placeholder,
  type,
  id,
  className,
  onChange,
}: IInput) {
  return (
    <input
      type={type}
      className={`border focus:outline-none h-8 px-2 rounded-md ${className}`}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
    />
  );
}
