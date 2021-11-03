import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';


const Home = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (!props.user) {
      history.push('/')
    }
    
  }, [])
  return (
    <section>
      <h2>Account home</h2>
    </section>
  );
};

export default Home;