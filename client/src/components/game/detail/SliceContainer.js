import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { WhiteSpace } from 'antd-mobile'

import Loading from '../../Loading'
import { fetchDayData, fetchMinuteData } from '../../../actions/dataActions'
import Table from './Table'

class SliceContainer extends Component {

  state = {
    loading: true,
    data: null
  }

  componentWillMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true
    })
    this.fetchData(nextProps)
  }

  fetchData(props) {

    const { configure, minute, params } = props

    if (minute) {
      fetchMinuteData({ ...configure, ...params })
        .then(data => {
          if (data.result === 0) {
            const values = data.data[0].data.pop()
            this.setState({
              loading: false,
              data: [{
                data: [values],
                key: data.data[0].key
              }]
            })
          }
        });
    } else {
      fetchDayData({ ...configure, ...params })
        .then(data => {
          this.setState({
            loading: false,
            data: data
          })
        });
    }
  }

  render() {

    const { loading, data } = this.state

    if (loading) {
      return (
        <Loading />
      )
    }

    const { name, chart } = this.props.configure
    const { from, to } = this.props.params
    const { key: dates, data: source } = data[0]

    const datasets = source.map((data) => {
      return {
        label: data.name ? data.name : name,
        data: data.data,
        fill: false,
        borderColor: 'rgb(75,192,192)',
        backgroundColor: 'rgb(75,192,192)',
        lineTension: 0.1
      }
    })
    const chartData = {
      labels: dates,
      datasets: datasets
    }
    const line = chart === false ? '' : <Line data={chartData} />

    return (
      <div>
        {line}
        <WhiteSpace />
        <p>{`${from}至${to}`}</p>
        <WhiteSpace />
        <Table dates={dates} data={source} name={name} />
        <WhiteSpace />
      </div>
    )
  }
}

export default SliceContainer
