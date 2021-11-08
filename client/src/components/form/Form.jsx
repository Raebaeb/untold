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
    handleChange
  } = props;

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

  const createOptions = (array, linked) => {
    if (name !== "Scene") { 
      return
    } else {
      const names = linked.map(char => char.name);
      const characterOptions = array.map((char) => {
        const isActive = names.includes(char.name) === true ? true : false;
        return { value: char.id, label: char.name, active: isActive };
    });
    console.log(characterOptions)
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
  const options = createOptions(characters, state.linkedChars);

  return (
    <form onSubmit={handleSubmit} className='story-form'>
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
          onChange={(e) => handleChange(e)}
          allowSelectAll={true}
          value={state.selectedOption}
          placeholder="Select Participating Characters"
        />
        </div>
      ) : null}
      <button type="submit" className='save-btn'>SAVE</button>
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
          checked={props.data.active}
          onChange={() => null}
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};