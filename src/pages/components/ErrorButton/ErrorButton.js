import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ErrorButton = ({handleError, isWhiteText}) => (
  <div className={'error'} style={{color: isWhiteText && 'white'}}>
    <p>An error occurred</p>
    <button onClick={handleError}>Try again</button>
  </div>
);

ErrorButton.propTypes = {
  handleError: PropTypes.func.isRequired
};

export default ErrorButton;