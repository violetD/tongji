import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'

import CustomIcon from '../components/CustomIcon'
import GamesTable from '../components/index/GamesTable'
import { logout } from  '../actions/userActions'

class GameList extends Component {

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <div>
        <NavBar
        rightContent={[
          <CustomIcon key="logout" type={require('../assets/svg/logout.svg')} onClick={this.handleLogout} />
        ]}
        >所有产品预览</NavBar>
        <GamesTable />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    user: store.user
  }
})(GameList);
