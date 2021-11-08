import Input from "./Input";
import TextArea from "./TextArea";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Form = (props) => {
  const {
    fieldsList,
    update,
    handleSubmit,
    name,
    state,
    characters,
  } = props;

  console.log(characters)

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

  const createOptions = (array) => {
    if (name !== "Scene") { 
      return
    } else {
    const characterOptions = array.map((char) => {
      return { value: char.id, label: char.name };
    });
    return characterOptions;
  }
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
  const options = createOptions(characters);

  return (
    <form onSubmit={handleSubmit}>
      {formInputs.map((comp) => comp)}
      {name === "Scene" ? (
        <div id="scene-dropdown">
        <span>Linked Characters:</span>
        <ReactSelect
          className="Dropdown-root"
          options={options}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
          }}
          // onChange={handleChange}
          allowSelectAll={true}
          value={state.optionSelected}
          placeholder="Select Participating Characters"
        />
        </div>
      ) : null}
      <button type="submit" className='save-btn'>Save {name}</button>
    </form>
  );
};

export default Form;

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
