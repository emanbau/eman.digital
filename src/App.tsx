import React from 'react';
import './App.scss';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/work' component={Work} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
