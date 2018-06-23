import React from 'react';
import {Route, Router} from 'react-router';
import {ROUTES} from './routesConstants';

// Pages
import Home from './../pages/Home';

class App extends React.Component {

  render() {
    return (
      <Router history={this.props.history}>
        <Route path={ROUTES.home} component={Home}/>
      </Router>
    );
  }
}

export default App;
