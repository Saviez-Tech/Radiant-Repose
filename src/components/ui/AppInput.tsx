"use client";

import {
  ComponentProps,
  HTMLAttributes,
  memo,
  useEffect,
  useState,
} from "react";

export type AppInputProps = {
  icon?: React.ReactNode;
  placeholder: string;
  value?: string;
  name: string;
  type?: string;
  readonly?: boolean;
  hidden?: boolean;
  ps?: string;
  title?: string;
  error?: string[];
  onChange?: (value: string) => void;
  inputProps?: HTMLAttributes<HTMLInputElement> & ComponentProps<"input">;
};

export default memo(function AppInput({
  icon,
  placeholder,
  value,
  name,
  type = "text",
  onChange,
  ps,
  title,
  readonly,
  hidden,
  error: fieldError,
  inputProps,
}: AppInputProps) {
  const [val, setVal] = useState(value);
  const [error] = useState<string | null>(null);
  const hasFieldError = fieldError && fieldError.length > 0 && fieldError[0];

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className={hidden ? "hidden" : ""}>
      {title && (
        <label
          htmlFor={`${title}-input`}
          className="inline-block pb-1 text-primary-dark_gray font-semibold text-label"
        >
          {title}
        </label>
      )}
      <div className="relative AppInput z-[1]">
        <span
          className={`absolute inline-block left-3 opacity-60 top-1/2 -translate-y-1/2`}
        >
          {icon}
        </span>
        <input
          {...inputProps}
          readOnly={readonly}
          hidden={hidden}
          id={`${title}-input`}
          name={name}
          placeholder={placeholder}
          type={type}
          value={type === "file" ? undefined : val}
          onChange={(e) => {
            inputProps?.onChange?.(e);
            if (type === "file") return;
            setVal(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          className={`app-input ${ps ? ps : !icon ? "ps-4" : "ps-9"} pe-9 ${
            error || hasFieldError ? "!bg-red-100" : ""
          }`}
        />
      </div>
      {error && <p className="text-red-900 text-xs">{error}</p>}
      {hasFieldError && <p className="text-red-900 text-xs">{fieldError[0]}</p>}
    </div>
  );
});
