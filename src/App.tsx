import React from 'react';
import './App.scss';
import ThreeImage from './components/ThreeImage';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/'>
            <Home />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/work'>
            <Work />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
