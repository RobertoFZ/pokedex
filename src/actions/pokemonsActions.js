
export const ACTION_TYPES = {
  LOAD_POKEMONS_LIST: 'LOAD_POKEMONS_LIST',
};

export function updatePokemonsLis() {
  return {type: ACTION_TYPES.LOAD_POKEMONS_LIST};
}
