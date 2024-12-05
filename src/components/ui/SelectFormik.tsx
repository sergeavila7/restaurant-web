import cn from "classnames";
import { useField } from "formik";
import {
  type FC,
  type InputHTMLAttributes,
  type ChangeEvent,
  useState,
} from "react";
import { Spinner } from "../ui/Spinner";

export type OptionT = {
  value: string | number;
  label: string;
};

interface SelectProps {
  label?: string;
  name: string;
  className?: string;
  options: OptionT[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const SelectFormik: FC<
  SelectProps & InputHTMLAttributes<HTMLSelectElement>
> = ({
  className = "",
  label,
  name,
  options,
  onChange,
  disabled,
  loading,
  ...props
}) => {
  const [field, { error, touched }] = useField({ name, type: name });
  const [focus, setFocus] = useState(false);

  const inputContainerClassName = cn(
    "transition w-full cursor-default py-1.5 pl-3 rounded-3xl border border-light-gray-400 text-left bg-transparent flex items-center pr-2",
    {
      "!pr-10": loading,
      "!bg-gray-50 cursor-not-allowed": disabled,
    },
    className
  );

  const inputClassName = cn(
    "border-none h-full w-full bg-transparent border-transparent focus:border-transparent focus:ring-0",
    {
      "cursor-not-allowed": disabled,
    }
  );

  const labelClassName = cn(
    "ease-in duration-100 ml-4 translate-y-2 w-fit text-sm text-blue-600 font-semibold",
    {
      "!-translate-y-1 !bg-transparent": focus,
      "!backdrop-blur-xl px-2": !focus,
    }
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    field.onChange(e);
    onChange && onChange(e);
  };

  return (
    <div>
      <div className={labelClassName}>
        <label>{label}</label>
      </div>
      <div className={inputContainerClassName}>
        <select
          {...field}
          {...props}
          value={field.value}
          onChange={handleChange}
          className={inputClassName}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value ?? ""}>
              {option.label || "Seleccione una opción"}
            </option>
          ))}
        </select>
        {loading && (
          <div className="-mr-5">
            <Spinner size="xs" />
          </div>
        )}
      </div>
      {touched && error && (
        <div className="error text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};
