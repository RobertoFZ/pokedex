/**
 * Created by Roberto on 1/23/18.
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import pokemonsReducer from './pokemonsReducer';

const pokedexApp = combineReducers({
  pokemons: pokemonsReducer,
  routing: routerReducer,
});

export default pokedexApp;