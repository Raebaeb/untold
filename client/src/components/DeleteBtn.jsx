import { useHistory } from "react-router-dom";

const DeleteBtn = ({ deleteFunc, name, storyid, elemid}) => {
  const history = useHistory();

  const handleDelete = async () => {
    await deleteFunc(storyid, elemid)
    history.push(`/${storyid}/${name}s`)
  }

  return (
    <button id="delete-btn" onClick={handleDelete}>
      Delete {name}
    </button>
  );
};

export default DeleteBtn;