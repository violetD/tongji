import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar, Icon, Drawer, List } from 'antd-mobile'

import CustomIcon from '../components/CustomIcon'
import Loading from '../components/Loading'
import { fetchGame } from '../actions/gameActions'
import { logout } from  '../actions/userActions'

class Layout extends Component {

  state = {
    open: false
  }

  componentWillMount() {
    this.props.dispatch(fetchGame(this.props.game.game_id))
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  }

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render() {

    const { games, game } = this.props

    const menus = games.map((game) => {
      return (
        <List.Item key={game.game_id}>
          <Link to={`/game/${game.game_id}`}>
            {game.game_name}
          </Link>
        </List.Item>
      )
    })
    return (
      <div className="app-content" style={{ height: '100%' }}>
        <NavBar 
          icon={<Icon type="ellipsis" />}
          onLeftClick={this.onOpenChange}
          rightContent={[
            <CustomIcon key="logout" type={require('../assets/svg/logout.svg')} onClick={this.handleLogout} />
          ]}
        >{game.game_name}</NavBar>
        <Drawer 
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          sidebar={menus} 
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          {this.props.children}
        </Drawer>
      </div>
    )
  }
}

class Game extends Component {

  render() {

    const { match, games, dispatch } = this.props
    const { gameId } = match.params

    if (!games.fetched) {
      return (
        <Loading />
      )
    }

    const game = games.games.find(game => {
      return game.game_id === gameId
    })
    if (!game) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <Layout game={game} games={games.games} dispatch={dispatch}>
        {this.props.children}
      </Layout>
    );
  }
}

export default connect((store) => {
  return {
    games: store.games,
  }
})(Game)
