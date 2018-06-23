import React, {Component} from 'react';
import {Link} from 'react-router';
import {ROUTES} from './../../../../app/routesConstants';
import PropTypes from 'prop-types';
import './styles.scss';

class SideMenu extends Component {
  render() {
    const {logo, textLogo, width} = this.props;
    return (
      <div className="side_menu" style={{width}}>
        <div className={'side_menu__app_logo'}>
          <Link to={ROUTES.home}>
            <img src={logo}/> {textLogo}
          </Link>
        </div>
      </div>
    )
  }
}

SideMenu.propTypes = {
  logo: PropTypes.string.isRequired,
  textLogo: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};


export default SideMenu;