import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../components/Loader/Loader';
import {canSelectPokemon} from '../../actions/pokemonsActions';
import PokemonInfo from './components/PokemonInfo/PokemonInfo';
import './styles.scss';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import PokemonAbilities from './components/PokemonAbilities/PokemonAbilities';
import PokemonMoves from './components/PokemonMoves/PokemonMoves';

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
                <PokemonAbilities abilities={currentPokemon.data.abilities}/>
                <PokemonMoves moves={currentPokemon.data.moves}/>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default PokemonDetail;