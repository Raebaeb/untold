import Input from "./Input";
import TextArea from "./TextArea";
import Dropdown from "../dropdown/Dropdown";

const Form = (props) => {
  // pass in handleSubmit, Title of object, fieldsList
  const { handleSubmit, obj, fieldsList, } = props;

  return (
    <form onSubmit={handleSubmit}>
      {fieldsList.map((field) => {
        if (field.type === "input") {
          (<Input label={field.label} state={field.state}/>);
        } else if (field.type === "textarea") {
          (<TextArea label={field.label} />);
        } else {
          (<Dropdown />);
        }
      })}

      <button>Save {obj}</button>
    </form>
  );
};

export default Form;
