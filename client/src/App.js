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
        <Route path='/story/new'>
          <Screen.StoryForm />
        </Route>
        <Route path='/story/edit/:id'>
          <Screen.StoryForm />
        </Route>
        <Route path='/story/:id'>
          <Screen.ViewStory />
        </Route>
        <Route path='/:id/characters' exact>
          <Screen.CharacterMain />
        </Route>
        <Route path='/:id/characters/new'>
          <Screen.CharacterForm />
        </Route>
        <Route path='/:id/characters/:character'>
          <Screen.CharacterForm />
        </Route>
        <Route path='/:id/ideas' exact>
          <Screen.IdeaMain />
        </Route>
        <Route path='/:id/ideas/new'>
          <Screen.IdeaForm />
        </Route>
        <Route path='/:id/ideas/:story'>
          <Screen.IdeaForm />
        </Route>
        <Route path='/:id/scenes' exact>
          <Screen.SceneMain />
        </Route>
        <Route path='/:id/scenes/new'>
          <Screen.SceneForm />
        </Route>
        <Route path='/:id/scenes/:scene'>
          <Screen.SceneForm />
        </Route>
        <Route path='/:id/timeline'>
          <Screen.Timeline />
        </Route>
        </main>
      </Switch>
      <Component.Footer />
    </div>
  );
}

export default App;
