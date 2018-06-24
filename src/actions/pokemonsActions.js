import PokemonsResource from '../api/PokemonsResource';

export const ACTION_TYPES = {
  FETCH_POKEMONS_LIST: 'FETCH_POKEMONS_LIST',
  FETCH_POKEMON: 'FETCH_POKEMON',
  LOAD_POKEMONS_LIST: 'LOAD_POKEMONS_LIST',
  SELECT_POKEMON: 'SELECT_POKEMON',
  UPDATE_POKEMON_DATA: 'UPDATE_POKEMON_DATA',
};

/**
 * Action for Get Pokemons List from API
 * @returns {Function}
 */
export function fetchPokemons() {
  return function (dispatch, getState) {
    const state = getState();
    const params = {
      limit: state.pokemons.pagination.elements,
    };
    dispatch(fetchingPokemonList(true));
    PokemonsResource.listPokemons(params).then(response => {
      const {next, previous, results} = response;
      dispatch(updatePokemonsLis(next, previous, results));
      dispatch(fetchingPokemonList(false));
    }).catch(error => {
      console.log('Error in fetch pokemons');
    });
  };
}

/**
 * Action for select an current pokemon
 * @param pokemonId
 * @returns {Function}
 */
export function selectPokemon(pokemonId) {
  return function (dispatch, getState) {
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
        });
      }
    }
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
