import React, {Component} from 'react';
import {Link} from 'react-router';
import {ROUTES} from './../../../../app/routesConstants';
import PropTypes from 'prop-types';
import './styles.scss';
import Loader from '../../../components/Loader/Loader';
import ReactDOM from 'react-dom';
import ErrorButton from '../../../components/ErrorButton/ErrorButton';

class SideMenu extends Component {
  DOM = null;
  state = {
    screenWidth: window.innerWidth,
    menuElementsDOM: null,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize, false);
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
    const {onElementClick, onMenuOpen} = this.props;
    if (onElementClick) onElementClick(id);
    if (onMenuOpen) onMenuOpen();
  };

  handleWindowResize = () => {
    this.setState({screenWidth: window.innerWidth});
  };

  handleScroll = () => {
    const {onScroll} = this.props;
    const {scrollTop, scrollHeight, clientHeight} = this.DOM;
    if (scrollTop === (scrollHeight - clientHeight)) {
      onScroll()
    }
  };

  render() {
    const {error, isOpen, handleError, onMenuOpen, logo, loading, menuWidth, textLogo} = this.props;
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
          <div className={'side_menu_elements'} onScroll={this.handleScroll} ref={(ref) => this.DOM = ref}>
            {
              this.displayMenuElements()
            }
            {
              error && <ErrorButton handleError={handleError} isWhiteText={true}/>
            }
            {
              loading && <Loader/>
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
  error: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleError: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  logo: PropTypes.string.isRequired,
  onElementClick: PropTypes.func,
  onMenuOpen: PropTypes.func,
  onScroll: PropTypes.func,
  textLogo: PropTypes.string.isRequired,
};


export default SideMenu;