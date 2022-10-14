import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/index.js';
import SearchResults from './components/SearchResults/index.js';

function App() {
  return (
    <div id='main-content'>
      <Home />
      
      <Switch>

      <Route path={`/error`}>
          <p id='invalid'>No results found. Check your spelling and try again!</p>
        </Route>

        <Route path={`/:word`}>
          <SearchResults />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
