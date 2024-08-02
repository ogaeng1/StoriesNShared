import { TextareaHTMLAttributes } from "react";

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ className, placeholder, id, onChange }: ITextarea) => {
  return (
    <textarea
      placeholder={placeholder}
      id={id}
      maxLength={300}
      className={`border p-2 rounded-md resize-none focus:outline-none ${className}`}
      onChange={onChange}
    />
  );
};

export default Textarea;
