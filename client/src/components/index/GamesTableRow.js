import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchDayData } from  '../../actions/dataActions'

const dataParams = {
  data_info: [
  { type: 2, task_id: 14, range: '', period: 1, factor: 1, },
  { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, precision: 4, }
  ],
  exprs: [
  { data_name: '新增用户', period: 1, precision: 0, unit: '', expr: '{0}', },
  { data_name: '收入', period: 1, precision: 2, unit: '', expr: '{1}', }
  ],
};

class GamesTableRow extends Component {

  state = {
    loading: true,
    data: null
  }

  componentWillMount() {
    this._isMounted = true
    fetchDayData({
      ...dataParams,
      ...this.props.configure
    }).then(data => {
      if (this._isMounted) {
        this.setState({
          loading: false,
          data: data
        });
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { loading, data } = this.state;
    const { game_name, game_id, gpzs_id } = this.props;

    if (loading) {
      return (
        <tr>
          <td><Link to={`/game/${game_id}/${gpzs_id}`}>{game_name}</Link></td>
          <td colSpan='3'>Loading...</td>
        </tr>
      );
    } else if (data) {

      const newer = data[0]['data'][0]['data'][1];
      const yesterday = parseInt(data[0]['data'][1]['data'][0], 10);
      const today = data[0]['data'][1]['data'][1];

      const rate = yesterday ? ((today - yesterday) / yesterday * 100).toFixed(2) + '%' : 'N/A';
      return (
        <tr>
          <td><Link to={`/game/${game_id}/${gpzs_id}`}>{game_name}</Link></td>
          <td>{newer}</td>
          <td>{today}</td>
          <td>{rate}</td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td><Link to={`/game/${game_id}/${gpzs_id}`}>{game_name}</Link></td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
        </tr>
      );
    }
  }
}

export default GamesTableRow
