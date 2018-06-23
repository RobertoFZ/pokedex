import React, {Component} from 'react';
import {connect} from 'react-redux';
import SideMenu from './components/SideMenu/SideMenu';
import constants from './constants';
import './styles.scss';
import VerticalAlignContent from '../components/VeticalAlignContent/VerticalAlignContent';
import {selectPokemon} from '../../actions/pokemonsActions';

function mapStateToProps(state, props) {
  const {fetchingPokemonList, list} = state.pokemons;
  return {
    pokemonsList: list,
    fetchingPokemonList,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    selectPokemon: (pokemonId) => {
      dispatch(selectPokemon(pokemonId));
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  state = {
    menuWidth: 359,
    screenHeight: window.innerHeight,
  };

  render() {
    const {menuWidth, screenHeight} = this.state;
    const {children, fetchingPokemonList, pokemonsList, selectPokemon} = this.props;
    const NO_SELECTED_POKEMON = <h1 className={'select_pokemon'}>Choose a pokemon</h1>;

    return (
      <div>
        <SideMenu width={menuWidth} logo={constants.LOGO} textLogo={constants.TEXT_LOGO} elements={pokemonsList}
                  onElementClick={selectPokemon} loading={fetchingPokemonList}/>
        <div className={'main_content'} style={{marginLeft: menuWidth}}>
          {
            children ? children : <VerticalAlignContent height={screenHeight} content={NO_SELECTED_POKEMON}/>
          }
        </div>
      </div>
    )
  }
}

export default Home;