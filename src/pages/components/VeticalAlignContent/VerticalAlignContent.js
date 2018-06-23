import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const VerticalAlignContent = ({height, content}) => (
  <div className={'vertical_align_container'} style={{height}}>
    <div>
      {content}
    </div>
  </div>
);

VerticalAlignContent.propTypes = {
  height: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
};

export default VerticalAlignContent;