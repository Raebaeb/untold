import useState from 'react';

const TextArea = (props) => {
  const { label } = props.character
  const { state, setState } = props

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