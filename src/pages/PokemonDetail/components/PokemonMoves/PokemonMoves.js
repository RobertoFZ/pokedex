import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function displayMoves(types) {
  return types.map((entry, index) => {
    return <li key={index}>{index + 1} {entry.move.name}</li>;
  })
}

const PokemonMoves = ({moves}) => (
  <div className={'moves__container'}>
    <h2>Moves</h2>
    <ul className={'moves__list'}>
      {displayMoves(moves)}
    </ul>
  </div>
);

PokemonMoves.propTypes = {
  moves: PropTypes.array.isRequired,
};

export default PokemonMoves;