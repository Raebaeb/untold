import { useEffect, useState } from 'react';

const Input = (props) => {

  const [state, setState] = useState("")
  const { label } = props.character

  useEffect(() => {
    setState(props.state)
  }, [props.state])

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