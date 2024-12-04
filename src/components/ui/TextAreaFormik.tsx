import { useField } from "formik";
import { useState, ReactNode, TextareaHTMLAttributes } from "react";
import cn from "classnames";

interface ITextAreaProps {
  label?: string | ReactNode;
  name: string;
  className?: string;
  children?: ReactNode;
}

export const TextAreaFormik = ({
  className = "",
  label,
  children,
  name,
  ...props
}: ITextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const [field, { error, touched }] = useField({ name, type: name });
  const [focus, setFocus] = useState(false);

  const inputClassName = cn(
    "w-full py-2 pl-3 rounded-3xl border border-light-gray-400 text-left bg-transparent flex items-center focus:ring-1 ",
    {
      "!bg-gray-50 cursor-not-allowed": props.disabled,
    },
    className
  );

  const labelClassName = cn(
    "ease-in duration-100 ml-4 translate-y-2 w-fit text-sm text-blue-600 font-semibold",
    {
      "!-translate-y-1 !bg-transparent": focus,
      "!backdrop-blur-xl px-2": !focus,
    }
  );

  return (
    <div className={className}>
      <div className="flex flex-col">
        {label && <label className={`block ${labelClassName}`}>{label}</label>}
        <textarea
          {...field}
          {...props}
          className={inputClassName}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {touched && error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
};
