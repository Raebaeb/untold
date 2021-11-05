import { Switch, Route } from 'react-router';
import { useState } from 'react';
import * as Screen from './screens'
import * as Component from './components'
import './App.css';


function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Component.Nav user={user} setUser={setUser}/>
      <Switch>
        <main>
        <Route path='/' exact>
          <Screen.Landing />
        </Route>
        <Route path='/register'>
          <Screen.Register setUser={setUser}/>
        </Route>
        <Route path='/login'>
          <Screen.Login setUser={setUser} />
        </Route>
        <Route path='/home'>
          <Screen.Home user={user}/>
        </Route>
        <Route path='/new-story'>
          <Screen.StoryForm />
        </Route>
        <Route path='/edit-story/:id'>
          <Screen.StoryForm />
        </Route>
        <Route path='/story/:id'>
          <Screen.ViewStory />
        </Route>
        <Route path='/:id/scenes'>
          <Screen.SceneMain />
        </Route>
        <Route path='/:id/scenes/:scene'>
          <Screen.ViewScene />
        </Route>
        <Route path='/:storyid/timeline'>
          <Screen.Timeline />
        </Route>
        </main>
      </Switch>
      <Component.Footer />
    </div>
  );
}

export default App;
