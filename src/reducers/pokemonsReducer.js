import {ACTION_TYPES} from './../actions/pokemonsActions';

const initialState = {
  currentPokemon: null,
  list: new Map(),
  fetchingPokemon: false,
  fetchingPokemonList: true,
  pagination: {
    elements: 150,
    next: null,
    previous: null,
  },
  updatingPokemonList: false,
  listError: false,
  detailError: false,
};

export default function pokemonsReducer(state = initialState, action) {
  const {list} = state;
  switch (action.type) {
    case ACTION_TYPES.LOAD_POKEMONS_LIST:
      const {next, previous, pokemons} = action;
      state.next = next;
      state.previous = previous;
      state.list = updatePokemonsList(pokemons, list);
      return {
        ...state,
      };
    case ACTION_TYPES.SELECT_POKEMON:
      const {pokemon} = action;
      if (pokemon) {
        state.list.set(pokemon.data.id, pokemon);
        state.currentPokemon = pokemon;
      }
      return {
        ...state,
      };
    case ACTION_TYPES.FETCH_POKEMON:
      state.fetchingPokemon = action.fetching;
      return {
        ...state,
      };
    case ACTION_TYPES.FETCH_POKEMONS_LIST:
      state.fetchingPokemonList = action.fetching;
      return {
        ...state,
      };
    case ACTION_TYPES.UPDATING_POKEMONS_LIST:
      state.updatingPokemonList = action.updating;
      return {
        ...state,
      };
    case ACTION_TYPES.FETCH_POKEMON_LIST_ERROR:
      state.listError = action.error;
      return {
        ...state,
      };
    case ACTION_TYPES.FETCH_POKEMON_ERROR:
      state.detailError = action.error;
      return {
        ...state,
      };
    default:
      return {...state};
  }
}

// Utils

/**
 * Obtain the Pokemon ID from the URL that use Pokemon API
 * @param pokemons
 * @param pokemonsList
 * @returns {*}
 */
function updatePokemonsList(pokemons, pokemonsList) {
  const regex = /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(\d+)/;
  const length = pokemons.length;

  for (let i = 0; i < length; i++) {
    const pokemon = pokemons[i];
    let id = Number(pokemon.url.match(regex)[1]);
    pokemonsList.set(id, pokemon);
  }
  return pokemonsList;
}