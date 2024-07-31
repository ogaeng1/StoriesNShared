import { TextareaHTMLAttributes } from "react";

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ className, placeholder, onChange }: ITextarea) => {
  return (
    <textarea
      placeholder={placeholder}
      maxLength={300}
      className={`border p-2 rounded-md resize-none focus:outline-none ${className}`}
      onChange={onChange}
    />
  );
};

export default Textarea;
