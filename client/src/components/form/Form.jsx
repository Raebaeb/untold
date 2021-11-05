import Input from "./Input";
import TextArea from "./TextArea";
import Dropdown from "../dropdown/Dropdown";

const Form = (props) => {
  // pass in handleSubmit, Title of object, fieldsList, states
  const {
    handleSubmit,
    obj,
    fieldsList,
    story,
    setStory,
    character,
    setCharacter,
    scene,
    setScene,
    idea,
    setIdea
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      {fieldsList.map((field) => {
        return field.type === "input" ? (
          <Input key={field.label} label={field.label} state={field.state} />
        ) : field.type === "textarea" ? (
          <TextArea label={field.label} key={field.label} state={field.state} />
        ) : (
          <h2>it aint workin</h2>
        );
      })}
      <button>Save {obj}</button>
    </form>
  );
};

export default Form;
