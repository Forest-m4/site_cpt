import React from "react";
import Typography from "../../ui/Typography";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography variant="subtitle-medium" color="primary">
        {label}
      </Typography>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[384px] h-[40px] px-3 border border-muted rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
};

export default InputField;
