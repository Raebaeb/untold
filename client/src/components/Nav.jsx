import { Link } from "react-router-dom";
import { logout } from "../services";

const Nav = (props) => {
  const handleLogout = async () => {
    await logout();
    props.setUser(null)
  }
  return (
    <nav>
      <Link to="/home">Untold.</Link>
      {props.user ? (<><h3>Welcome back, {props.user.first_name}!</h3>
                    <button onClick={handleLogout}>Log Out</button></>) : null}
    </nav>
  );
};

export default Nav;
