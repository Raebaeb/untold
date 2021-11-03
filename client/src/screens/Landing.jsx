import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section>
      <h3>Register or Log In to continue.</h3>
      <Link to='/register'>Sign Up</Link>
      <Link to='/login'>Log In</Link>
    </section>
  );
};

export default Landing;