import { useState } from "react";
import { useHistory } from "react-router";
import { register } from "../services";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords don't match");
      return
    };
    const newUser = {
      email,
      password,
      first_name: firstName,
      last_name: lastName
    };
    const user = await register(newUser);
    props.setUser(user);
    history.push('/home');
  }
  return (
    <section>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password-confirm">Confirm Password:</label>
        <input
          id="password-confirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />        
        <label htmlFor="first-name">First Name:</label>
        <input
          id="first-name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="last-name">Last Name:</label>
        <input
          id="last-name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <button type="submit">REGISTER</button>
      </form>
    </section>
  );
};

export default Register;