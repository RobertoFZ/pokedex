import React from 'react'
import configureStore from 'redux-mock-store'
import Home from './Home';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('>>>Home Page --- REACT-REDUX (Shallow + passing the {store} directly)', () => {
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
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<Home store={store}/>)
  });

  it('+++ render the connected(SMART) component', () => {
    expect(container.length).toEqual(1)
  });

  it('+++ check Prop matches with initialState', () => {
    expect(container.prop('output')).toEqual(initialState.output)
  });

});