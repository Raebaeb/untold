import { Link } from "react-router-dom";

const Landing = () => {


  return (
    <section id='landing-page'>
      <div id='landing-hero'>
        Creative Writers
      </div>
      <article id='landing-info'>
      <p>A writer's digital notebook that helps you build an encyclopedia for your untold stories. Keep track of every detail and organize your thoughts in an environment that helps you tie them all together. Register or log in to an account to start the creative journey.</p>
      <Link to='/register'><button className='register-btn user-btn'>REGISTER</button></Link>
      <Link to='/login'><button className='login-btn user-btn'>LOG IN</button></Link>
      </article>
    </section>
  );
};

export default Landing;