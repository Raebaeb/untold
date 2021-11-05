
const Input = ({ label, state, setState }) => {

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