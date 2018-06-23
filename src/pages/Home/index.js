import React, {Component} from 'react';
import SideMenu from './components/SideMenu';
import constants from './constants';
import './styles.scss';
import VerticalAlignContent from '../components/VeticalAlignContent';

class Home extends Component {
  state = {
    menuWidth: 359,
    screenHeight: window.innerHeight,
  };

  render() {
    const {menuWidth, screenHeight} = this.state;
    const {children} = this.props;
    const NO_SELECTED_POKEMON = <h1 className={'select_pokemon'}>Choose a pokemon</h1>;

    const elements = [
      {
        id: 1,
        name: 'GENGAR',
        link: '/detail/1',
      },{
        id: 2,
        name: 'KINGLER',
        link: '/detail/2',
      },{
        id: 3,
        name: 'VOLTORB',
        link: '/detail/3',
      }
    ];

    return (
      <div>
        <SideMenu width={menuWidth} logo={constants.LOGO} textLogo={constants.TEXT_LOGO} elements={elements}/>
        <div className={'main_content'} style={{marginLeft: menuWidth}}>
          {
            children ? children : <VerticalAlignContent height={screenHeight} content={NO_SELECTED_POKEMON}/>
          }
        </div>
      </div>
    )
  }
}

export default Home;