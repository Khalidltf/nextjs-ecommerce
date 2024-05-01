"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const SubmitButton = ({ children, className, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      className={`btn-primary btn ${className}`}
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default SubmitButton;
