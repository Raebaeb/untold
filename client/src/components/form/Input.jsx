const Input = ({ label, fieldKey, update, value }) => {


  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        name={fieldKey}
        type="text"
        value={value}
        required={fieldKey === 'title' || fieldKey === 'name' ? true : false}
        onChange={(e) => update({[`${fieldKey}`]: e.target.value})}
      />
    </div>
  );
};

export default Input;



