import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../components/Loader/Loader';
import {canSelectPokemon} from '../../actions/pokemonsActions';
import PokemonInfo from './PokemonInfo/PokemonInfo';
import './styles.scss';

function mapStateToProps(state, props) {
  const {currentPokemon, fetchingPokemon, fetchingPokemonList, list} = state.pokemons;
  return {
    pokemonsList: list,
    fetchingPokemon,
    currentPokemon: currentPokemon ? currentPokemon.data && currentPokemon : null,
    fetchingPokemonList,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    selectCurrentPokemon: (pokemonId) => {
      dispatch(canSelectPokemon(pokemonId));
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class PokemonDetail extends Component {

  componentDidMount() {
    const {pokemonId} = this.props.params;
    this.props.selectCurrentPokemon(pokemonId);
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, nextState);
    return true;
  }

  render() {
    const {currentPokemon, fetchingPokemon, fetchingPokemonList} = this.props;
    return (
      <div className={'detail__content'}>
        {
          fetchingPokemon || fetchingPokemonList ? <Loader/> : currentPokemon && <div>
            <div className={'row'}>
              <div className={'column'}>
                <PokemonInfo data={currentPokemon.data}/>
              </div>
              <div className={'column'}>
                <p>Otro detalle</p>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default PokemonDetail;