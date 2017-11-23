import React, { Component } from 'react'
import { Flex, Button, List, Radio, DatePicker, Modal } from 'antd-mobile'
import Sticky from 'react-sticky-el'

import CustomIcon from '../../CustomIcon'

const RadioItem = Radio.RadioItem
const today = new Date()

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `${dateStr}`;
}

class Tool extends Component {

  state = {
    open: false,
    platformId: '-1',
    gpzsId: null,
    from: null,
    to: null,
		time: 1,
    selfDisplay: false
  }

  componentWillMount() {
    this.setState({
      gpzsId: this.props.gpzsId
    })
  }

  setTime = (time) => {
    let { from, to } = this.state
    switch (time) {
      case 0:
          from = new Date()
          from.setDate(today.getDate() - 7)
          to = new Date()
        break;
      case 1:
          from = new Date()
          from.setDate(today.getDate() - 15)
          to = new Date()
        break;
      case 2:
          from = new Date()
          from.setDate(today.getDate() - 30)
          to = new Date()
        break;
      default:
        break;
    }
		this.setState({ 
      selfDisplay: time === 3,
      time,
      from,
      to
    })
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleSubmit = () => {
    const { gpzsId, from, to } = this.state
    this.handleClose()
    this.props.filter(gpzsId, formatDate(from), formatDate(to))
  }

  setGpzs = (gpzsId) => {
    this.setState({ gpzsId })
  }

  setPlatform = (platformId) => {
    this.setState({ platformId })
  }

  setFrom = (from) => {
    this.setState({ from })
  }

  setTo = (to) => {
    this.setState({ to })
  }

  render() {

    const { game } = this.props
    const { platformId, gpzsId, time, selfDisplay } = this.state

    const platformItems = game.gpzs.platform.filter(gpzs => {
      return gpzs.zone_id === '-1' && gpzs.server_id === '-1'
    }).map(gpzs => (
			<RadioItem key={gpzs.gpzs_id} checked={gpzs.platform_id === platformId} onChange={() => this.setPlatform(gpzs.platform_id)}>{gpzs.gpzs_name}</RadioItem>
		))
		const gpzsItems = game.gpzs.gpzs.filter(gpzs => {
			return gpzs.platform_id === platformId
		}).map(gpzs => (
			<RadioItem key={gpzs.gpzs_id} checked={gpzs.gpzs_id === gpzsId} onChange={() => this.setGpzs(gpzs.gpzs_id)}>{gpzs.gpzs_name}</RadioItem>
		))
    const timeSlotItems = [{
      key: 0,
      text: '近7天'
    }, {
      key: 1,
      text: '近15天'
    }, {
      key: 2,
      text: '近30天'
    }, {
      key: 3,
      text: '自定义'
    }].map(i => (
			<RadioItem key={i.key} checked={i.key === time} onChange={() => this.setTime(i.key)}>{i.text}</RadioItem>
		))

    return (
      <div>
        <CustomIcon onClick={this.handleOpen} type={require('../../../assets/svg/filter.svg')} />
				<Modal
					visible={this.state.open}
					onClose={this.handleClose}
				>
          <List renderHeader={() => '渠道/平台'}>{platformItems}</List>
          <List renderHeader={() => '区服'}>{gpzsItems}</List>
          <List renderHeader={() => '时段'}>{timeSlotItems}</List>
          <List style={{
            display: selfDisplay ? 'block' : 'none'
          }} renderHeader={() => '自定义时间段'}>
            <DatePicker
              mode="date"
              value={this.state.from}
              onChange={this.setFrom}
            >
              <List.Item arrow="horizontal">开始时间</List.Item>
            </DatePicker>
            <DatePicker
              mode="date"
              value={this.state.to}
              onChange={this.setTo}
            >
              <List.Item arrow="horizontal">结束时间</List.Item>
            </DatePicker>
          </List>
          <Sticky
            mode="bottom"
            stickyStyle={{
              backgroundColor: '#fff',
              zIndex: 2
            }}
          >
            <Flex>
              <Flex.Item>
                <Button
                  onClick={this.handleClose}
                >取消</Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                >确定</Button>
              </Flex.Item>
            </Flex>
          </Sticky>
				</Modal>
      </div>
    )
  }
}

export default Tool
