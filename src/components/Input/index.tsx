import React from 'react';
import useInput, {validationType} from '../../hooks/useInput';

type props = {
  name: string;
  type: validationType;
  label: string;
  placeholder: string;
  msg: string;
};

function Input({name, type, label, placeholder, msg}: props) {
  const [Check, onChangeValidation] = useInput(type);

  return (
    <>
      <label htmlFor="email" className="text-xs text-gray-500">
        {label}
      </label>
      <input
        name={name}
        className="border-solid border-2"
        type={type}
        autoFocus
        onChange={onChangeValidation}
        placeholder={placeholder}
        required
      />
      {!Check ? <p className="text-red-500">{msg}</p> : null}
    </>
  );
}

export default Input;
