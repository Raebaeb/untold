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
        <Route path='/new/story'>
          <Screen.StoryForm />
        </Route>
        <Route path='/story/edit/:id'>
          <Screen.StoryForm />
        </Route>
        <Route path='/story/:id' exact>
          <Screen.ViewStory />
        </Route>
        <Route path='/:id/characters'>
          <Screen.CharacterMain />
        </Route>
        <Route path='/:id/new/characters'>
          <Screen.CharacterForm />
        </Route>
        <Route path='/:id/characters/:character' exact>
          <Screen.CharacterForm />
        </Route>
        <Route path='/:id/ideas'>
          <Screen.IdeaMain />
        </Route>
        <Route path='/:id/new/ideas' exact>
          <Screen.IdeaForm />
        </Route>
        <Route path='/:id/ideas/:idea' exact>
          <Screen.IdeaForm />
        </Route>
        <Route path='/:id/scenes' exact>
          <Screen.SceneMain />
        </Route>
        <Route path='/:id/new/scenes' exact>
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
