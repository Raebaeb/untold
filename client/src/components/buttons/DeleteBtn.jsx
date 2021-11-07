import { useHistory } from "react-router-dom";

const DeleteBtn = ({ deleteFunc, name, storyid, elemid}) => {
  const history = useHistory();

  const handleDelete = async () => {
    if (!elemid) {
      await deleteFunc(storyid)
      history.push('/home')
    } else {
      await deleteFunc(storyid, elemid)
      history.push(`/${storyid}/${name}s`)
    }
  }

  return (
    <button id="delete-btn" onClick={handleDelete}>
      Delete {name}
    </button>
  );
};

export default DeleteBtn;
