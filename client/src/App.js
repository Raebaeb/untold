import { Switch, Route } from 'react-router';
import Nav from './components/Nav';
import Home from './screens/Home';
import Footer from './components/Footer';
import './App.css';


function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <main>
        <Route path='/' exact>
          <Home />
        </Route>
        </main>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
