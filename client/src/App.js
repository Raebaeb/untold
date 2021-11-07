import { Switch, Route } from 'react-router';
import { useState } from 'react';
import * as Screen from './screens'
import * as Component from './components'
import './App.css';


function App() {
  const [user, setUser] = useState(null);
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState([])

  return (
    <div className="App">
      <Component.Nav user={user} setUser={setUser} stories={stories} story={story}/>
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
          <Screen.Home user={user} stories={stories} setStories={setStories} setStory={setStory}/>
        </Route>
        <Route path='/new/story'>
          <Screen.StoryForm />
        </Route>
        <Route path='/story/edit/:id'>
          <Screen.StoryForm />
        </Route>
        <Route path='/story/:id' exact>
          <Screen.ViewStory story={story} setStory={setStory}/>
        </Route>
        <Route path='/:id/characters' exact setStory={setStory}>
          <Screen.CharacterMain />
        </Route>
        <Route path='/:id/new/characters' setStory={setStory}>
          <Screen.CharacterForm />
        </Route>
        <Route path='/:id/characters/:character' >
          <Screen.CharacterForm />
        </Route>
        <Route path='/:id/ideas' exact setStory={setStory}> 
          <Screen.IdeaMain />
        </Route>
        <Route path='/:id/new/ideas' setStory={setStory} >
          <Screen.IdeaForm />
        </Route>
        <Route path='/:id/ideas/:idea'>
          <Screen.IdeaForm />
        </Route>
        <Route path='/:id/scenes' exact setStory={setStory}>
          <Screen.SceneMain />
        </Route>
        <Route path='/:id/new/scenes' setStory={setStory}>
          <Screen.SceneForm />
        </Route>
        <Route path='/:id/scenes/:scene'>
          <Screen.SceneForm />
        </Route>
        <Route path='/:id/timeline' setStory={setStory}>
          <Screen.Timeline />
        </Route>
        </main>
      </Switch>
      <Component.Footer />
    </div>
  );
}

export default App;
