import Dropdown from "react-dropdown";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";

const DropdownContainer = ({ linkArray, story }) => {
  const history = useHistory();

  const createOptions = (array) => {
    if (!array.length) {
      const options = [];
      return options;
    } else {
      const ops = Array.isArray(array) ? Array.from(array) : array
      const options = ops.map((link) => {
        return { value: link.id, label: link.title };
      });
      return options;
    }
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
