import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { Flex } from 'antd-mobile'
import { Link } from 'react-router-dom'

import Loading from '../../Loading'
import { fetchDayData } from  '../../../actions/dataActions'

class ChartRow extends Component {

  state = {
    loading: true,
    data: null
  }

  componentDidMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps)
  }

  fetchData(props) {
    this.setState({
      loading: true,
      data: null
    })
    fetchDayData({...props})
      .then(data => {
        this.setState({
          loading: false,
          data: data[0]
        })
      })
  }

  render() {

    const { loading, data } = this.state;
    const { game_id: gameId, gpzs_id: gpzsId, index, color } = this.props

    if (loading) {
      return (
        <Loading />
      );
    } else {
      const chartData = {
        labels: data.key,
        datasets: [
        {
          label: data.data[0].name,
          data: data.data[0].data,
          fill: false,
          borderColor: color,
          backgroundColor: color,
          lineTension: 0.1
        }
        ]
      }
      const length = data.data[0].data.length
      const today = data.data[0].data[length-1]
      const yesterday = data.data[0].data[length-2]
      return (
        <Flex>
          <Flex.Item style={{
            flexGrow: 3
          }}>
            <Line data={chartData} />
          </Flex.Item>
          <Flex.Item>
              <h3>{data.data[0].name}</h3>
              <p>今日<Link to={`/detail/${gameId}/${gpzsId}/${index}`}>{today ? today : 'N/A'}</Link></p>
              <p>昨日<Link to={`/detail/${gameId}/${gpzsId}/${index}`}>{yesterday ? yesterday : 'N/A'}</Link></p>
          </Flex.Item>
        </Flex>
      );
    }
  }
}

export default ChartRow
