
const TextArea = ({ label, value, update }) => {

  return (
    <div className="text-area-container">
      <label htmlFor={label}>{label}</label>
      <textarea 
        id={label}
        value={value}
        onChange={(e) => update(e.target.value)}
      />
    </div>
  );
};

export default TextArea;