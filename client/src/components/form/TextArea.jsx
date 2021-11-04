import { useState, useEffect } from "react";

const TextArea = (props) => {
  const label = props.label
  const [state, setState] = useState("")

  useEffect(() => {
    setState(props.state)
  }, [props.state])
  return (
    <div className="text-area-container">
      <label htmlFor={label}>{label}</label>
      <textarea 
        id={label}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default TextArea;