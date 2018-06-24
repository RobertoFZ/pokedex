const REACT_APP_POKE_API_ENDPOINT = process.env.REACT_APP_POKE_API_ENDPOINT;
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {ACTION_TYPES, fetchPokemons} from './pokemonsActions';
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async fetch pokemon action', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates FETCH_POKEMON_LIST when fetching POKEMONS has been done', () => {
    const initialState = {
      pokemons: {
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
      }
    };

    fetchMock
      .get(`${REACT_APP_POKE_API_ENDPOINT}/pokemon/?limit=${initialState.pokemons.pagination.elements}&offset=null&`, {
        body: {
          next: 'https://pokeapi.co/api/v2/pokemon/?limit=150&offset=150',
          results: [],
          previous: 'https://pokeapi.co/api/v2/pokemon/?limit=150',
        },
        headers: {'content-type': 'application/json'}
      });

    const expectedActions = [
      {
        fetching: true,
        type: ACTION_TYPES.FETCH_POKEMONS_LIST
      },{
        error: false,
        type: ACTION_TYPES.FETCH_POKEMON_LIST_ERROR,
      }, {
        next: 'https://pokeapi.co/api/v2/pokemon/?limit=150&offset=150',
        pokemons: [],
        previous: 'https://pokeapi.co/api/v2/pokemon/?limit=150',
        type: ACTION_TYPES.LOAD_POKEMONS_LIST
      },{
        fetching: false,
        type: ACTION_TYPES.FETCH_POKEMONS_LIST,
      }
    ];
    const store = mockStore(initialState);

    return store.dispatch(fetchPokemons()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
});