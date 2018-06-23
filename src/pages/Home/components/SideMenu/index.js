import React, {Component} from 'react';
import {Link} from 'react-router';
import {ROUTES} from './../../../../app/routesConstants';
import PropTypes from 'prop-types';
import './styles.scss';

class SideMenu extends Component {

  displayMenuElements = () => {
    const {elements} = this.props;
    return elements.map((element) => {
      return <Link className={'element'} to={element.link}>
        <span className={'element__id'}>{element.id}</span>
        <span className={'element__name'}>{element.name}</span>
      </Link>
    });
  };

  render() {
    const {logo, textLogo, width} = this.props;
    return (
      <div className="side_menu" style={{width}}>
        <div className={'side_menu__app_logo'}>
          <Link to={ROUTES.home}>
            <img src={logo}/> {textLogo}
          </Link>
        </div>
        <div className={'side_menu_elements'}>
          {this.displayMenuElements()}
        </div>
      </div>
    )
  }
}

SideMenu.defaultProps = {
  elements: [],
};

SideMenu.propTypes = {
  logo: PropTypes.string.isRequired,
  textLogo: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};


export default SideMenu;