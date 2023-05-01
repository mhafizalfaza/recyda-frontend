export enum ButtonScheme {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
  quaternary = "quaternary",
  primaryAlt = "primaryAlt",
  secondaryAlt = "secondaryAlt",
  tertiaryAlt = "tertiaryAlt",
  quaternaryAlt = "quaternaryAlt",
  danger = "danger",
}

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonType {
  button = "button",
  submit = "submit",
}

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm rounded-2xl",
  md: "px-3.5 py-2 text-base rounded-3xl",
  lg: "px-4 py-2.5 text-lg rounded-3xl",
  xl: "px-5 py-3 text-xl rounded-3xl",
};

const buttonSchemes = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-purple-500 text-white",
  tertiary: "bg-pink-500 text-white",
  quaternary: "bg-yellow-500 text-white",
  primaryAlt: "bg-blue-700 text-white",
  secondaryAlt: "bg-purple-700 text-white",
  tertiaryAlt: "bg-pink-700 text-white",
  quaternaryAlt: "bg-yellow-700 text-white",
  danger: "bg-red-600 text-white",
};

interface ButtonProps {
  label: string;
  scheme?: ButtonScheme;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  onClick?: () => void;
}

export function Button({
  label,
  scheme = ButtonScheme.primary,
  disabled = false,
  size = ButtonSize.sm,
  type = ButtonType.button,
  onClick,
}: ButtonProps) {
  const schemeClass = buttonSchemes[scheme];
  const sizeClass = buttonSizes[size];

  return (
    <button
      type={type}
      className={`${schemeClass} ${sizeClass} disabled:opacity-30 disabled:cursor-not-allowed`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
