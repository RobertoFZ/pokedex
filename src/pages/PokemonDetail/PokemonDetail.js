import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../components/Loader/Loader';
import {selectPokemon} from '../../actions/pokemonsActions';

function mapStateToProps(state, props) {
  const {currentPokemon, fetchingPokemon, list} = state.pokemons;
  return {
    pokemonsList: list,
    fetchingPokemon,
    currentPokemon: currentPokemon ? currentPokemon.data && currentPokemon : null,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    selectCurrentPokemon: (pokemonId) => {
      dispatch(selectPokemon(pokemonId));
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class PokemonDetail extends Component {

  componentDidMount() {
    const {pokemonId} = this.props.params;
    this.props.selectCurrentPokemon(pokemonId);
  }

  render() {
    const {currentPokemon, fetchingPokemon} = this.props;
    return (
      <div className={'detail__content'}>
        {
          fetchingPokemon ? <Loader/> : currentPokemon && <div>
            {currentPokemon.name} {currentPokemon.data.weight}
          </div>
        }
      </div>
    )
  }
}

export default PokemonDetail;