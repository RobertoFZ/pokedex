import {ACTION_TYPES} from './../actions/pokemonsActions';

const initialState = {
  pokemons: [],
};

export default function pokemonsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.LOAD_POKEMONS_LIST:
      state.pokemons = action.pokemons;
      return {
        state,
      };
    default:
      return state;
  }
}