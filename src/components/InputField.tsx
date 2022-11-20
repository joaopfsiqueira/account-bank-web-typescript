import { Field, useField } from 'formik';
import { InputType } from 'node:zlib';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <input {...field} {...props} id={field.name} />
      {error ? (
        <div className="flex max-w-[90%] text-red-400 hover:text-red-600 mt-1">
          {error}
        </div>
      ) : null}
    </div>
  );
};
