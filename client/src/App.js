import { Switch, Route } from 'react-router';
import { useState } from 'react';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import Nav from './components/Nav';
import Landing from './screens/Landing';
import Footer from './components/Footer';
import './App.css';
import StoryForm from './screens/story/StoryForm';
import ViewStory from './screens/story/ViewStory';


function App() {
  const [user, setUser] = useState();

  return (
    <div className="App">
      <Nav user={user} setUser={setUser}/>
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
        <Route path='/new-story'>
          <StoryForm />
        </Route>
        <Route path='/edit-story/:id'>
          <StoryForm />
        </Route>
        <Route path='/story/:id'>
          <ViewStory />
        </Route>
        </main>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
