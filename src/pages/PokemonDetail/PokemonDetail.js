import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../components/Loader/Loader';
import {canSelectPokemon} from '../../actions/pokemonsActions';
import PokemonInfo from './PokemonInfo/PokemonInfo';
import './styles.scss';
import ErrorButton from '../components/ErrorButton/ErrorButton';

function mapStateToProps(state, props) {
  const {currentPokemon, detailError, fetchingPokemon, fetchingPokemonList, list} = state.pokemons;
  return {
    currentPokemon: currentPokemon ? currentPokemon.data && currentPokemon : null,
    detailError,
    pokemonsList: list,
    fetchingPokemon,
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
    this.loadPokemon();
  }

  handleError = () => {
    this.loadPokemon();
  };

  loadPokemon = () => {
    const {pokemonId} = this.props.params;
    this.props.selectCurrentPokemon(pokemonId);
  };

  render() {
    const {currentPokemon, detailError, fetchingPokemon, fetchingPokemonList} = this.props;
    console.log(currentPokemon);
    return (
      <div className={'detail__content'}>
        {
          detailError && <ErrorButton handleError={this.handleError} isWhiteText={false}/>
        }
        {
          fetchingPokemon || (fetchingPokemonList && !currentPokemon) ? <Loader/> : currentPokemon && <div>
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