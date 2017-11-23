import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import { Link } from 'react-router-dom'

import Loading from '../../Loading'
import { fetchDistributionData } from  '../../../actions/dataActions'

class PieRow extends Component {

  state = {
    loading: true,
    data: null
  }

  componentDidMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true,
      data: null
    })
    this.fetchData(nextProps)
  }

  fetchData(props) {
    fetchDistributionData({...props})
      .then(data => {
        this.setState({
          loading: false,
          data: data.data[0]
        })
      })
  }

  render() {

    const { loading, data } = this.state;
    const { game_id: gameId, gpzs_id: gpzsId, colors } = this.props

    if (loading) {
      return (
        <Loading />
      )
    }
    if (!data) {
      return (
        <div />
      )
    }

    const labels = data.key.slice(0, 5).concat('其他')
    const dataset = data.data[0].data.slice(0, 5).concat(data.data[0].data.slice(5).reduce((sum, item) => {
      return parseInt(sum, 10) + parseInt(item, 10)
    }, 0))
    const chartData = {
      labels: labels,
      datasets: [
      {
        data: dataset,
        fill: false,
        backgroundColor: colors,
        lineTension: 0.1
      }
      ]
    }
    return (
      <Pie data={chartData} />
    )
  }
}

export default PieRow
