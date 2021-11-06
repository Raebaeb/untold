import Input from "./Input";
import TextArea from "./TextArea";
import Dropdown from "../dropdown/Dropdown";

const Form = (props) => {
  // list, update, submit, name
  const { fieldsList, update, handleSubmit, name, object } = props;



  return (
    <form onSubmit={handleSubmit}>
      {fieldsList.map((field, i) => {
        return field.type === "input" ? (
          <Input key={i} label={field.label} fieldKey={field.key} update={update} value={field.key}/>
        ) : field.type === "textarea" ? (
          <TextArea label={field.label} key={i} fieldKey={field.key} update={update}/>
        ) : (
          <h2>it aint workin</h2>
        );
      })}
      <button>Save {name}</button>
    </form>
  );
};

export default Form;
