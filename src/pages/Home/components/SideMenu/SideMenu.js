import React, {Component} from 'react';
import {Link} from 'react-router';
import {ROUTES} from './../../../../app/routesConstants';
import PropTypes from 'prop-types';
import './styles.scss';
import Loader from '../../../components/Loader/Loader';

class SideMenu extends Component {

  displayMenuElements = () => {
    const {elements, onElementClick} = this.props;
    return Array.from(elements).map((element) => {
      const id = element[0];
      const data = element[1];
      return <Link key={id} className={'element'} to={ROUTES.pokemonDetail.replace(':pokemonId', id)}
                   onClick={() => onElementClick(id)}>
        <span className={'element__id'}>{id}</span>
        <span className={'element__name'}>{data.name}</span>
      </Link>
    });
  };

  render() {
    const {logo, loading, textLogo, width} = this.props;
    return (
      <div className="side_menu" style={{width}}>
        <div className={'side_menu__app_logo'}>
          <Link to={ROUTES.home}>
            <img src={logo}/> {textLogo}
          </Link>
        </div>
        <div className={'side_menu_elements'}>
          {
            loading ? <Loader/> : this.displayMenuElements()
          }
        </div>
      </div>
    )
  }
}

SideMenu.defaultProps = {
  elements: [],
};

SideMenu.propTypes = {
  loading: PropTypes.bool.isRequired,
  onElementClick: PropTypes.func,
  logo: PropTypes.string.isRequired,
  textLogo: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};


export default SideMenu;