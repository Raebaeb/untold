import { useEffect, useState } from 'react';

const Input = (props) => {

  const label = props.label
  const [state, setState] = useState("")

  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input 
        id={label}
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;