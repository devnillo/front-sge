// components/FormField.tsx
import { Input } from "@/components/ui/input";

export const FormField = ({
  id,
  label,
  required = false,
  placeholder,
  error,
  register,
  cols = 12,
  className =  `col-span-12 md:col-span-${cols}`,
  
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}:
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        {...register(id)}
        className={`${error ? "focus-visible:border-red-500 border-2 border-red-500" : ""}`}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
