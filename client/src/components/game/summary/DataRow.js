import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Loading from '../../Loading'
import { fetchDayData, fetchMinuteData } from  '../../../actions/dataActions'

class DataRow extends Component {

  state = {
    dayLoading: true,
    minuteLoading: true,
    dayData: null,
    minuteData: null,
  }

  componentWillMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dayLoading: true,
      minuteLoading: true,
      dayData: null,
      minuteData: null,
    })
    this.fetchData(nextProps)
  }

  fetchData(props) {

    fetchDayData({...props.day, ...props})
      .then(data => {
        this.setState({
          dayLoading: false,
          dayData: data[0].data
        })
      })

    if (props.minute) {
      fetchMinuteData({
        ...props.minute,
        ...props,
        check_all: 1,
      }).then(data => {

        let value = 'N/A'
        if (data.data && data.data[0].data) {
          const olcnt = data.data[0].data.pop()

          value = olcnt.data.filter((i) => {
            return i
          }).pop()
        }

        this.setState({
          minuteLoading: false,
          minuteData: [{
            data: value
          }]
        })
      })
    } else {
      this.setState({ minuteLoading: false })
    }
  }

  render() {

    const { dayLoading, minuteLoading, dayData, minuteData } = this.state

    if (dayLoading || minuteLoading) {
      return (
        <Loading />
      )
    }

    const { game_id: gameId, gpzs_id, day, minute, insertIndex, ...rest } = this.props
    const { index: dayIndex, exprs } = day
    let dayColumns = dayData.map((data, num) => (
      <li key={exprs[num].data_name}>
        <label>{exprs[num].data_name}</label>
        <Link to={`/detail/${gameId}/${dayIndex[num]}`}>{data.data[0] === null ? 'N/A' : data.data[0]}</Link>
      </li>
    ))
    let minuteColumns = []
    if (minute) {
      const { index: minuteIndex, data_info } = minute
      minuteColumns = minuteData.map((data, num) => (
        <li key={data_info[num].data_name}>
          <label>{data_info[num].data_name}</label>
          <Link to={`/detail/${gameId}/${minuteIndex[num]}`}>{data.data}</Link>
        </li>
      ))
    }
    dayColumns.splice(insertIndex || 0, 0, minuteColumns)

    return (
      <ul {...rest}>{dayColumns}</ul>
    )
  }
}

export default DataRow
