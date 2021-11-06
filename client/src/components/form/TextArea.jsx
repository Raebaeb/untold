
const TextArea = ({ label, fieldKey, update }) => {

  return (
    <div className="text-area-container">
      <label htmlFor={label}>{label}</label>
      <textarea 
        id={label}
        name={fieldKey}
        onChange={(e) => update({[`${fieldKey}`]: e.target.value})}
      />
    </div>
  );
};

export default TextArea;