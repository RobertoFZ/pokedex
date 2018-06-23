import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import VerticalAlignContent from '../VeticalAlignContent/VerticalAlignContent';

const Loader = () => (
  <div style={{padding: '2em 0'}}>
    <div className="loader"/>
  </div>
);

VerticalAlignContent.propTypes = {};

export default Loader;