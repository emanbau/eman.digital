import { useState, useCallback } from 'react';
import './App.scss';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

function App() {

  // Loading State
  const [loading, setLoading] = useState<boolean>(true);
  // Change Loading State
  const loadingHandle = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <div className={loading ? 'loading' : 'loading false'}>
        <LoadingScreen loading={loading} loadingHandle={loadingHandle} />
      </div>
      <Router>
        <Switch>
          <Route exact path='/' >
            <Home loading={loading} />
          </Route>
          <Route path='/about' component={About} />
          <Route path='/work' component={Work} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
