import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, Toast, Button } from 'antd-mobile'
import { createForm } from 'rc-form'

import '../assets/styles/login.css'
import CustomIcon from '../components/CustomIcon'
import { login } from '../actions/userActions'

class Login extends Component {
	state = {
    usernameHasError: false,
    username: '',
		passwordHasError: false,
		password: '',
    loading: false,
  }
  componentDidMount() {
     this.usernameInst.focus();
  }
	onErrorClick = () => {
    if (this.state.usernameHasError) {
      Toast.info('请输入电脑开机用户名');
    } else if (this.state.passwordHasError) {
      Toast.info('请输入电脑开机密码');
    }
  }
  handleClick = () => {
    if (this.state.loading) return
    this.setState({
      loading: true,
    })
    const username = this.usernameInst.state.value ? this.usernameInst.state.value.replace(/\s/g, '') : ''
    const password = this.passwordInst.state.value ? this.passwordInst.state.value.replace(/\s/g, '') : ''
    let error = false
    if (username.length > 30 || username.length < 1) {
      this.setState({
        usernameHasError: true,
      })
      error = true
    } else {
      this.setState({
        usernameHasError: false,
      })
    }
    if (password.length > 30 || password.length < 1) {
      this.setState({
        passwordHasError: true,
      })
      error = true
    } else {
      this.setState({
        passwordHasError: false,
      })
    }
    this.setState({
      username,
      password,
    })

    if (error) {
      this.setState({
        loading: false,
      })
    } else {
      this.submit(username, password)
    }
  }

  submit = (username, password) => {
    this.props.dispatch(login(username, password))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isFetched) {
      if (this.state.loading && !nextProps.user.hasAuthed) {
        Toast.info(nextProps.user.error);
      }
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { user, form } = this.props
    const { getFieldProps } = form
    const { loading, usernameHasError, passwordHasError } = this.state
    if (user.hasAuthed) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div className="login-wrapper" ref={el => this.scrollView = el}>
        <div className="login-wrapper-inner">
          <div className="login-container">
            <h1><CustomIcon type={require('../assets/svg/logo.svg')} className="logo" /></h1>
            <List>
              <InputItem
                {...getFieldProps('username')}
                clear
                placeholder="请输入电脑开机用户名"
                labelNumber={2}
                ref={el => this.usernameInst = el}
                error={usernameHasError}
                onErrorClick={this.onErrorClick}
              ><CustomIcon onClick={() => this.usernameInst.focus()} type={require('../assets/svg/user.svg')} /></InputItem>
              <InputItem
                {...getFieldProps('pwd')}
                type="password"
                clear
                placeholder="请输入电脑开机密码"
                labelNumber={2}
                ref={el => this.passwordInst = el}
                error={passwordHasError}
                onErrorClick={this.onErrorClick}
              ><CustomIcon onClick={() => this.passwordInst.focus()} type={require('../assets/svg/password.svg')} /></InputItem>
              <List.Item className="button-line">
                <Button 
                  type="primary"
                  loading={loading}
                  onClick={this.handleClick}
                >登录</Button>
              </List.Item>
            </List>
          </div>
        </div>
      </div>
    );
  }
}

const LoginWrapper = createForm()(connect((store) => {
  return {
    user: store.user
  }
})(Login))

export default LoginWrapper
