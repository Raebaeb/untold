import { Link, useHistory } from "react-router-dom";
import { logout } from "../services";

const Nav = (props) => {
  const history = useHistory();
  
  const handleLogout = async () => {
    await logout();
    props.setUser(null);
    history.push('/')
  };
  return (
    <nav>
      <Link to="/home">Untold.</Link>
      {props.user ? (
        <>
          <h3>Welcome back, {props.user.first_name}!</h3>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : null}
    </nav>
  );
};

export default Nav;
