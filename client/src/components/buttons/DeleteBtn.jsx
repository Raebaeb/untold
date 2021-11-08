import { useHistory } from "react-router-dom";

const DeleteBtn = ({ deleteFunc, name, storyid, elemid}) => {
  const history = useHistory();

  const handleDelete = async () => {
    if (!elemid) {
      try {
        await deleteFunc(storyid)
        history.push('/home')
      } catch (e) {
        console.error('story delete', e.message)
      }
    } else {
      try {
        await deleteFunc(storyid, elemid)
        history.push(`/${storyid}/${name}s`)
      } catch (e) {
        console.error('other delete', e.message)
      }
    }
  }

  return (
    <button className="delete-btn" onClick={handleDelete}>
      Delete {name}
    </button>
  );
};

export default DeleteBtn;
