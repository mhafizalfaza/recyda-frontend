import { toKebabCase } from "@/utils/helpers";
import { ChangeEvent, FormEvent, useId } from "react";

export enum InputSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum InputScheme {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
  quaternary = "quaternary",
}

export enum InputType {
  text = "text",
  number = "number",
  submit = "submit",
}

interface InputProps {
  value?: string;
  type?: InputType;
  min?: number;
  max?: number;
  label?: string;
  id?: string;
  scheme?: InputScheme;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: InputSize;
  hook?: object;
  width?: number;
  placeholder?: string;
}

const inputSchemes = {
  primary:
    "bg-white disabled:bg-white border border-gray-200 focus:border-2 focus:border-blue-500 focus:outline-none focus-visible:border-2 focus-visible:outline-none focus-visible:border-blue-500",
  secondary:
    "bg-white disabled:bg-white border border-gray-200 focus:border-2 focus:border-purple-500 focus:outline-none focus-visible:border-2 focus-visible:outline-none focus-visible:border-purple-500",
  tertiary:
    "bg-white disabled:bg-white border border-gray-200 focus:border-2 focus:border-pink-500 focus:outline-none focus-visible:border-2 focus-visible:outline-none focus-visible:border-pink-500",
  quaternary:
    "bg-white disabled:bg-white border border-gray-200 focus:border-2 focus:border-yellow-500 focus:outline-none focus-visible:border-2 focus-visible:outline-none focus-visible:border-yellow-500",
};

const inputSizes = {
  sm: "px-3 py-1.5 text-sm rounded-2xl",
  md: "px-3.5 py-2 text-base rounded-3xl",
  lg: "px-4 py-2.5 text-lg rounded-3xl",
  xl: "px-5 py-3 text-xl rounded-3xl",
};

export function Input({
  value,
  type,
  min,
  max,
  label,
  id,
  scheme = InputScheme.primary,
  onChange,
  size = InputSize.sm,
  disabled = false,
  hook,
  width = 200,
  placeholder,
}: InputProps) {
  const schemeClass = inputSchemes[scheme];
  const sizeClass = inputSizes[size];
  const uniqueId = useId();
  const labelFor = id || toKebabCase(`${label} ${uniqueId}` || "");
  return (
    <div className="flex flex-col" style={{ gap: 4 }}>
      {labelFor && (
        <label htmlFor={labelFor} className="text-xs cursor-pointer">
          {label}
        </label>
      )}
      <input
        {...hook}
        id={labelFor}
        className={`${schemeClass} ${sizeClass}`}
        value={value}
        min={min}
        max={max}
        type={type}
        disabled={disabled}
        style={{ width }}
        {...(onChange ? { onChange } : {})}
        placeholder={placeholder}
      />
    </div>
  );
}
