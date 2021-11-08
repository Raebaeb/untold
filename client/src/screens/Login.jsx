import { useState } from "react";
import { useHistory } from "react-router";
import { login } from "../services"

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password
    };
    const user = await login(userInfo);
    props.setUser(user);
    history.push('/home');
  }
  return (
    <section id='login-page'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='user-form'>
        <label htmlFor="email" className='email-label'>Email</label>
        <input
          id="email"
          className='email'
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className='password-label'>Password</label>
        <input
          id="password"
          className='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='login-btn user-btn'>LOG IN</button>
      </form>
    </section>
  );
};

export default Login;