import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import pokedexApp from './reducers';
import App from './app/App';
import {fetchPokemons} from './actions/pokemonsActions';

//  Redux
let store = createStore(pokedexApp, applyMiddleware(thunkMiddleware));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Fetch first 150 pokemons
store.dispatch(fetchPokemons());

ReactDOM.render((
  <Provider store={store}>
    <App history={history}/>
  </Provider>
), document.getElementById('root'));
