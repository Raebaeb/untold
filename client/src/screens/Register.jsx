import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
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
    <section id='register-page'>
      <h1>Create An Account</h1>
      <form onSubmit={handleSubmit} className='user-form'>
        <div id='name-container'>
          <label htmlFor="first-name" className='first-name-class'>First Name</label>
          <input
            id="first-name"
            className='first-name-class'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="last-name" className='last-name-class'>Last Name</label>
          <input
            id="last-name"
            className='last-name-class'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <label htmlFor="email" className='email-class'>Email</label>
        <input
          id="email"
          className='email-class'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className='password-class'>Password</label>
        <input
          id="password"
          className='password-class'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password-confirm" className="password-confirm-class">Confirm Password</label>
        <input
          id="password-confirm"
          className="password-confirm-class"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />        
        <button type="submit" className='register-btn user-btn'>REGISTER</button>
      </form>
      <p>Already have an account? <br /> Log in <Link to='/login' id='login-link'>here</Link>.</p>
    </section>
  );
};

export default Register;