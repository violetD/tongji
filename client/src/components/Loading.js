import React, { Component } from 'react'
import { ActivityIndicator, WingBlank, WhiteSpace } from 'antd-mobile'


class Loading extends Component {
  render() {
    return (
      <WingBlank>
        <WhiteSpace size="xl" />
        <ActivityIndicator 
          text="加载中"
          size="large"
        />
        <WhiteSpace size="xl" />
      </WingBlank>
    )
  }
}

export default Loading
