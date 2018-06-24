import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function displayAbilities(types) {
  return types.map((entry, index) => {
    return <li key={index}>{index + 1} {entry.ability.name}</li>;
  })
}

const PokemonAbilities = ({abilities}) => (
  <div className={'abilities__container'}>
    <h2>Abilities</h2>
    <ul className={'abilities__list'}>
      {displayAbilities(abilities)}
    </ul>
  </div>
);

PokemonAbilities.propTypes = {
  abilities: PropTypes.array.isRequired,
};

export default PokemonAbilities;