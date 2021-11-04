import React from 'react';

const Input = (props) => {
  const { label } = props.character
  const { state, setState } = props
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input 
        id={label}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;