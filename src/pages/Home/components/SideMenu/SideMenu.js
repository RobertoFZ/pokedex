import React, {Component} from 'react';
import {Link} from 'react-router';
import {ROUTES} from './../../../../app/routesConstants';
import PropTypes from 'prop-types';
import './styles.scss';
import Loader from '../../../components/Loader/Loader';

class SideMenu extends Component {

  state = {
    screenWidth: window.innerWidth,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  displayMenuElements = () => {
    const {elements} = this.props;
    return Array.from(elements).map((element) => {
      const id = element[0];
      const data = element[1];
      return <Link key={id} className={'element'} to={ROUTES.pokemonDetail.replace(':pokemonId', id)}
                   onClick={() => this.handleElementClick(id)}>
        <span className={'element__id'}>{id}</span>
        <span className={'element__name'}>{data.name}</span>
      </Link>
    });
  };

  handleElementClick = (id) => {
    this.props.onElementClick(id);
    this.props.onMenuOpen();
  };

  handleWindowResize = () => {
    this.setState({screenWidth: window.innerWidth});
  };

  render() {
    const {isOpen, onMenuOpen, logo, loading, menuWidth, textLogo} = this.props;
    const {screenWidth} = this.state;
    return (
      <div className={'side_menu_container'}>
        <div className={'menu__icon'} onClick={onMenuOpen}>
          <div className={'bar'}/>
          <div className={'bar'}/>
          <div className={'bar'}/>
        </div>
        <div className={'side_menu'} style={{width: isOpen && menuWidth}}>
          <div className={`side_menu__app_logo ${screenWidth <= 768 && !isOpen && 'hide' }`}>
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
      </div>
    )
  }
}

SideMenu.defaultProps = {
  elements: [],
  menuWidth: 300,
};

SideMenu.propTypes = {
  loading: PropTypes.bool.isRequired,
  onElementClick: PropTypes.func,
  logo: PropTypes.string.isRequired,
  textLogo: PropTypes.string.isRequired,
};


export default SideMenu;