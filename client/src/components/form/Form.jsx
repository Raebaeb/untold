import Input from "./Input";
import TextArea from "./TextArea";
import Dropdown from "../dropdown/Dropdown";

const Form = (props) => {
  // list, update, submit, name
  const { fieldsList, update, handleSubmit, name } = props;

  return (
    <form onSubmit={handleSubmit}>
      {fieldsList.map((field, i) => {
        return field.type === "input" ? (
          <Input key={i} label={field.label} state={field.state} update={update}/>
        ) : field.type === "textarea" ? (
          <TextArea label={field.label} key={i} state={field.state} update={update}/>
        ) : (
          <h2>it aint workin</h2>
        );
      })}
      <button>Save {name}</button>
    </form>
  );
};

export default Form;
