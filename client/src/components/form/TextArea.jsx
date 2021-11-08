
const TextArea = ({ label, fieldKey, update, value }) => {

  return (
    <div className="text-area-container">
      <label htmlFor={label}>{label}</label>
      <textarea 
        id={label}
        name={fieldKey}
        value={value}
        onChange={(e) => update({[`${fieldKey}`]: e.target.value})}
      />
    </div>
  );
};

export default TextArea;