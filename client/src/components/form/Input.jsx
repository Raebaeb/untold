const Input = ({ label, fieldKey, update }) => {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        name={fieldKey}
        type="text"
        onChange={(e) => update({[`${fieldKey}`]: e.target.value})}
      />
    </div>
  );
};

export default Input;
