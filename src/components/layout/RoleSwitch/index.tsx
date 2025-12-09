import React from "react";
import Typography from "../../ui/Typography";

interface RoleSwitchProps {
  value: "reader" | "author";
  onChange: (val: "reader" | "author") => void;
}

const RoleSwitch: React.FC<RoleSwitchProps> = ({ value, onChange }) => {
  return (
    <div className="w-[166px] h-[42px] flex border  rounded-md overflow-hidden bg-back">
      {/* Читатель */}
      <button
        type="button"
        onClick={() => onChange("reader")}
        className="w-1/2 h-full relative flex items-center justify-center"
      >
        <div
          className={`absolute inset-1 rounded-md transition-colors duration-200 ${
            value === "reader" ? "bg-white" : "bg-back"
          }`}
        ></div>
        <Typography
          variant="subtitle-medium"
          color={value === "reader" ? "primary" : "slate500"}
          className="relative z-10"
        >
          Читатель
        </Typography>
      </button>

      {/* Автор */}
      <button
        type="button"
        onClick={() => onChange("author")}
        className="w-1/2 h-full relative flex items-center justify-center"
      >
        <div
          className={`absolute inset-1 rounded-md transition-colors duration-200 ${
            value === "author" ? "bg-white" : "bg-back"
          }`}
        ></div>
        <Typography
          variant="subtitle-medium"
          color={value === "author" ? "primary" : "slate500"}
          className="relative z-10"
        >
          Автор
        </Typography>
      </button>
    </div>
  );
};

export default RoleSwitch;
