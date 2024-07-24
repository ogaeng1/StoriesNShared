import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  placeholder,
  type,
  id,
  className,
  value,
  onChange,
}: IInput) {
  return (
    <input
      value={value}
      type={type}
      className={`focus:outline-none focus:ring-1 focus:ring-[#677777] rounded-xl box-border ${className}`}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
    />
  );
}
