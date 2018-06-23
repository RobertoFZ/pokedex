import React, {Component} from 'react';
import SideMenu from './components/SideMenu';
import constants from './constants';

class Home extends Component {
  state = {
    menuWidth: 359,
  };

  render() {
    const {menuWidth} = this.state;
    return (
      <div>
        <SideMenu width={menuWidth} logo={constants.LOGO} textLogo={constants.TEXT_LOGO}/>
      </div>
    )
  }
}

export default Home;