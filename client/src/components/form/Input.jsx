
const Input = ({ label, value, update }) => {

  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input 
        id={label}
        type="text"
        value={value}
        onChange={(e) => update(e.target.value)}
      />
    </div>
  );
};

export default Input;