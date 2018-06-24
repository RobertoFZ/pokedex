import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const COLORS = {
  "bug": "#CDDC39",
  "dark": "#212121",
  "electric": "#FFEB3B",
  "earth": "#F3DD5F",
  "fighting": "#795548",
  "fire": "#F44336",
  "flying": "#BDBDBD",
  "ghost": "#607D8B",
  "poison": "#713a9d",
  "psychic": "#FFC107",
  "rock": "#A38C22",
  "water": "#2196F3",
};

function displayTypes(types) {
  return types.map((entry, index) => {
    const color = COLORS[entry.type.name];
    return <div key={index} className={'column'}>
      <div className={'pokemon__type'} style={{backgroundColor: color ? color : '#565252'}}>
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