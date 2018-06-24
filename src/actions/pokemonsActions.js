import PokemonsResource from '../api/PokemonsResource';

export const ACTION_TYPES = {
  FETCH_POKEMON_LIST_ERROR: 'FETCH_POKEMON_LIST_ERROR',
  FETCH_POKEMONS_LIST: 'FETCH_POKEMONS_LIST',
  FETCH_POKEMON: 'FETCH_POKEMON',
  FETCH_POKEMON_ERROR: 'FETCH_POKEMON',
  LOAD_POKEMONS_LIST: 'LOAD_POKEMONS_LIST',
  SELECT_POKEMON: 'SELECT_POKEMON',
};

let fetchPokemonsPromise;

/**
 * Action for Get Pokemons List from API
 * @returns {Function}
 */
export function fetchPokemons(pokemonId) {
  return function (dispatch, getState) {
    const state = getState();
    const next = state.pokemons.next;

    const params = {
      limit: state.pokemons.pagination.elements,
      offset: next ? getOffsetFromUrl(next) : null,
    };
    dispatch(fetchingPokemonList(true));
    dispatch(fetchPokemonListError(false));
    fetchPokemonsPromise = PokemonsResource.listPokemons(params).then(response => {
      const {next, previous, results} = response;
      dispatch(updatePokemonsLis(next, previous, results));
      dispatch(fetchingPokemonList(false));
      if(typeof pokemonId !== 'undefined') dispatch(canSelectPokemon(pokemonId));
    }).catch(error => {
      console.log('Error in fetch pokemons');
      dispatch(fetchingPokemonList(false));
      dispatch(fetchPokemonListError(true));
    });
    return fetchPokemonsPromise;
  };
}

/**
 * Action for check if the user can select a Pokemon
 * @param pokemonId
 * @returns {Function}
 */
export function canSelectPokemon(pokemonId) {
  return function (dispatch, getState) {
    dispatch(fetchingPokemon(true));
    dispatch(dispatch(fetchPokemonError(false)));
    if (getState().pokemons.fetchingPokemonList) {
      fetchPokemonsPromise.then(() => selectPokemon(dispatch, getState, pokemonId));
    } else {
      selectPokemon(dispatch, getState, pokemonId);
    }
  };
}

/**
 * Action for change the selected pokemon for the user
 * @param dispatch
 * @param getState
 * @param pokemonId
 */
function selectPokemon(dispatch, getState, pokemonId) {
  const state = getState();
  const {list} = state.pokemons;
  const pokemon = list.get(Number(pokemonId));
  if (pokemon) {
    if (pokemon.data) {
      dispatch(changeCurrentPokemon(pokemon));
    } else {
      dispatch(fetchingPokemon(true));
      PokemonsResource.getPokemonData(pokemonId).then(response => {
        pokemon.data = response;
        dispatch(changeCurrentPokemon(pokemon));
        dispatch(fetchingPokemon(false));
      }).catch(error => {
        console.log('Error in fetch pokemon');
        dispatch(fetchingPokemon(false));
        dispatch(fetchPokemonError(true));
      });
    }
  }else{
    dispatch(fetchPokemons(pokemonId));
  }
}

/**
 *
 * @param pokemonListError
 * @returns {{type: string, error: *}}
 */
function fetchPokemonListError(pokemonListError) {
  return {
    type: ACTION_TYPES.FETCH_POKEMON_LIST_ERROR,
    error: pokemonListError,
  };
}

/**
 *
 * @param pokemonDetailError
 * @returns {{type: string, error: *}}
 */
function fetchPokemonError(pokemonDetailError) {
  return {
    type: ACTION_TYPES.FETCH_POKEMON_ERROR,
    error: pokemonDetailError,
  };
}

/**
 * Return FETCH_POKEMON values for Pokemon Reducer (Use for indicate loading pokemon data)
 * @param fetching
 * @returns {{type: string, fetching}}
 */
function fetchingPokemon(fetching) {
  return {type: ACTION_TYPES.FETCH_POKEMON, fetching};
}

/**
 * Return FETCH_POKEMON_LIST values for Pokemon Reducer (Use for indicate loading pokemon LIST data)
 * @param fetching
 * @returns {{type: string, fetching: *}}
 */
function fetchingPokemonList(fetching) {
  if (fetching) {
    fetchPokemonsPromise = null;
  }
  return {type: ACTION_TYPES.FETCH_POKEMONS_LIST, fetching};
}

/**
 * Return SELECT_POKEMON values for Pokemon Reducer. Change the current selected Pokemon
 * @param pokemon
 * @param list
 * @returns {{type: string, pokemon: *, list: *}}
 */
function changeCurrentPokemon(pokemon, list) {
  return {type: ACTION_TYPES.SELECT_POKEMON, pokemon, list};
}

/**
 * Return LOAD_POKEMONS_LIST values for Pokemon Reducer. Update the current pokemons list
 * @param next
 * @param previous
 * @param pokemons
 * @returns {{type: string, pokemons: *, next: *, previous: *}}
 */
function updatePokemonsLis(next, previous, pokemons) {
  return {type: ACTION_TYPES.LOAD_POKEMONS_LIST, pokemons, next, previous};
}

function getOffsetFromUrl(url) {
  const regex = /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\?limit=150&offset=(.+?)$/;
  return Number(url.match(regex)[1]);
}
