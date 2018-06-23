import React from 'react';
import {Route, Router} from 'react-router';
import {ROUTES} from './routesConstants';
import './../pages/style.scss';

// Pages
import Home from './../pages/Home';
import PokemonDetail from './../pages/PokemonDetail';

class App extends React.Component {

  render() {
    return (
      <Router history={this.props.history}>
        <Route path={ROUTES.home} component={Home}>
          <Route path={ROUTES.pokemonDetail} component={PokemonDetail}/>
        </Route>
      </Router>
    );
  }
}

export default App;
