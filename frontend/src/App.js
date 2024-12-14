// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import WaitingListPage from './pages/WaitingListPage';
import Users from './components/Users'; // Import Users component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/waiting-list" component={WaitingListPage} />
        <Route path="/admin/users" component={Users} /> {/* Add route for Users */}
      </Switch>
    </Router>
  );
}

export default App;