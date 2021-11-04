import useState from 'react';

const TextArea = (props) => {
  const { label, type } = props

  return (
    <div className="text-area-container">
      <label htmlFor={label}>{label}</label>
      <textarea id={label}></textarea>
    </div>
  );
};

export default TextArea;