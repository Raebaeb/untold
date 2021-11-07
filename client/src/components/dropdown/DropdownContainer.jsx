import Dropdown from "react-dropdown";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";

const DropdownContainer = ({ linkArray, story, disabled }) => {
  const history = useHistory();


  const createOptions = (array) => {
    const options = array.map((link) => {
      return { value: link.id, label: link.title };
    });
    return options;
  };

  const handleSelect = (option) => {
    !story ?
    history.push(`/story/${option.value}`) :
    history.push(`/${option.value}/${option.label}`)
  };

  const options = createOptions(linkArray);


  return (
    <Dropdown
      options={options}
      onChange={handleSelect}
      placeholder={!story ? "My Stories" : story.title}
    />
  );
};

export default DropdownContainer;
