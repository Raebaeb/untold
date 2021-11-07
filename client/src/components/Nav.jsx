import { Link, useHistory, useParams } from "react-router-dom";
import { logout } from "../services";
import { DropdownContainer } from ".";
import { useEffect } from "react";

const Nav = (props) => {
  const history = useHistory();
  const { story } = props;
  const storyElems = [{id: story.id, title: "Characters"}, {id: story.id, title: "Ideas"}, {id: story.id, title: "Scenes"}];

  const params = useParams();

  useEffect(() => {
    if (!params) {

    }
  }, [params])

  const handleLogout = async () => {
    await logout();
    props.setUser(null);
    history.push('/')
  };
  return (
    <nav>
      <Link to="/home" id="logo">Untold.</Link>
      {props.user ? (
        <>
          <h3>Welcome back, {props.user.first_name}!</h3>
          {story.length !== 0 ? <DropdownContainer linkArray={storyElems} story={story}/> : null}
          <DropdownContainer linkArray={props.stories}/>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : null}
    </nav>
  );
};

export default Nav;
