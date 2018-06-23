import Api from './api';

const API_ENDPOINT_POKEMONS = 'pokemon';

export default {

  listPokemons(params) {
    return Api.get(API_ENDPOINT_POKEMONS, null, params);
  },

  getPokemonData(pokemonId){
    return Api.get(API_ENDPOINT_POKEMONS, pokemonId);
  },

};
