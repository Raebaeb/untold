import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <Link to="/home">Untold.</Link>
      {props.user ? (<><h3>Welcome back, {props.user}!</h3>
                    <button>Log Out</button></>) : null}
    </nav>
  );
};

export default Nav;
