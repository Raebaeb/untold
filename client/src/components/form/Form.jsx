import Input from "./Input";
import TextArea from "./TextArea";
import Dropdown from "../dropdown/Dropdown";

const Form = (props) => {
  const { fieldsList, update, handleSubmit, name, state } = props;

  const checkState = (stateObj, field) => {
    if (stateObj) {
      for (const [key, value] of Object.entries(stateObj)) {
        if (field.key === key) {
          field["value"] = value;
        }
      }
    }
    return;
  };
  

  const createInputs = (fields) => {
    const components = fields.map((field, i) => {
      checkState(state, field);
      return field.type === "input" ? (
        <Input
          key={i}
          label={field.label}
          fieldKey={field.key}
          update={update}
          value={field.value}
        />
      ) : field.type === "textarea" ? (
        <TextArea
          label={field.label}
          key={i}
          fieldKey={field.key}
          update={update}
          value={field.value}
        />
      ) : null;
    });
    return components;
  };

  const formInputs = createInputs(fieldsList);

  return (
    <form onSubmit={handleSubmit}>
      {formInputs.map((comp) => comp)}
      <button>Save {name}</button>
    </form>
  );
};

export default Form;
