import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { isLogin } from '../actions/userActions'
import { fetchGames } from '../actions/gamesActions'
import Loading from '../components/Loading'

//const PRIVATE_ROOT = '/'
const PUBLIC_ROOT = '/login'

class AuthRoute extends React.Component {

  state = {
    hasAuthed: false,
  }

  constructor(props) {
    super(props)
    this.props.dispatch(isLogin())
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.hasAuthed !== nextProps.user.hasAuthed) {
      this.props.dispatch(fetchGames())
      this.setState({
        hasAuthed: nextProps.user.hasAuthed
      })
    }
  }

  render() {

    const { user, component } = this.props;

    if (user.loading || !user.isFetched) {
      return <Loading />
    }

    if (user.hasAuthed) {
        return <Route { ...this.props } component={ component } />;
    }
    else {
      return <Redirect to={ PUBLIC_ROOT } />;
    }
  }
}

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
}

export default connect((store) => {
  return {
    user: store.user,
  }
})(AuthRoute);
