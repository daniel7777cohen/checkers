import './App.css';
import React from 'react';
// import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import CheckersManager from './pages/CheckersManager';
// import store from './store/store';

function App() {
  return (
    // <Provider store={store}>
    <Router>
      <div className="layout">
        <Switch>
          <Route exact path="/" component={CheckersManager} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Router>
    // </Provider>
  );
}

export default App;
