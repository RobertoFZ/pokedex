import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function displayTypes(types) {
  console.log(types);
  return types.map((entry, index) => {
    return <div key={index} className={'column'}>
      <div className={'pokemon__type'}>
        {entry.type.name}
      </div>
    </div>;
  })
}

const PokemonInfo = ({data}) => (
  <div>
    <div className={'pokemon__image_container'}>
      <div>
        <img src={data.sprites.front_default}/>
      </div>
    </div>
    <div className={'pokemon__types'}>
      <div className={'row'}>
        {displayTypes(data.types)}
      </div>
    </div>
    <h1 className={'pokemon__name'}>{data.name}</h1>
    <h3 className={'pokemon__number'}>No. {data.id}</h3>
  </div>
);

PokemonInfo.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default PokemonInfo;