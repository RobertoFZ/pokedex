import React, {Component} from 'react';
import {connect} from 'react-redux';
import SideMenu from './components/SideMenu/SideMenu';
import constants from './constants';
import './styles.scss';
import VerticalAlignContent from '../components/VeticalAlignContent/VerticalAlignContent';
import {canSelectPokemon, fetchPokemons} from '../../actions/pokemonsActions';

function mapStateToProps(state, props) {
  const {fetchingPokemonList, list, listError} = state.pokemons;
  return {
    pokemonsList: list,
    fetchingPokemonList,
    listError,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    selectPokemon: (pokemonId) => {
      dispatch(canSelectPokemon(pokemonId));
    },
    loadNextPokemonsList: () => {
      dispatch(fetchPokemons());
    },
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  state = {
    screenHeight: window.innerHeight,
    isMenuOpen: false,
  };

  handleMenuScroll = () => {
    this.props.loadNextPokemonsList();
  };

  handleMenuOpen = () => {
    const {isMenuOpen} = this.state;
    const width = window.innerWidth;
    if (width <= 768) {
      this.setState({isMenuOpen: !isMenuOpen});
    } else {
      this.setState({isMenuOpen: false});
    }
  };

  handleError = () => {
    this.loadNextPokemonsList();
  };

  render() {
    const {isMenuOpen, screenHeight} = this.state;
    const {children, fetchingPokemonList, pokemonsList, selectPokemon, listError} = this.props;
    const NO_SELECTED_POKEMON = <h1 className={'select_pokemon'}>Choose a pokemon</h1>;

    return (
      <div>
        <SideMenu logo={constants.LOGO} textLogo={constants.TEXT_LOGO} elements={pokemonsList}
                  onElementClick={selectPokemon} loading={fetchingPokemonList} isOpen={isMenuOpen} error={listError}
                  onMenuOpen={this.handleMenuOpen} onScroll={this.handleMenuScroll} handleError={this.handleError}/>
        <div className={'main_content'} onClick={this.handleMenuOpen}>
          {
            children ? children : <VerticalAlignContent height={screenHeight} content={NO_SELECTED_POKEMON}/>
          }
        </div>
      </div>
    )
  }
}

export default Home;