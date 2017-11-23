import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import AuthRoute from './AuthRoute'
import Login from './Login'
import GameList from './Index'
import Game from './Game'
import Summary from './Summary'
import Detail from './Detail'

class App extends Component {
  render() {
    return (
        <div>
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <AuthRoute exact path="/" component={GameList} />
              <AuthRoute path="/game/:gameId" render={(props) => {
                return (
                  <Game {...props}>
                    <Summary {...props} />
                  </Game>
                )
              }} />
              <AuthRoute path="/detail/:gameId/:dataIndex" render={(props) => {
                return (
                  <Game {...props}>
                    <Detail  {...props} />
                  </Game>
                )
              }} />
            </Switch>
          </Router>
        </div>
    )
  }
}

export default App
