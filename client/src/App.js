import { Switch, Route } from 'react-router';
import { useState } from 'react';
import Nav from './components/Nav';
import Landing from './screens/Landing';
import Footer from './components/Footer';
import './App.css';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';


function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Nav />
      <Switch>
        <main>
        <Route path='/' exact>
          <Landing />
        </Route>
        <Route path='/register'>
          <Register setUser={setUser}/>
        </Route>
        <Route path='/login'>
          <Login setUser={setUser} />
        </Route>
        <Route path='/home'>
          <Home user={user}/>
        </Route>
        </main>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
