import React, { Component } from 'react';
import reqwest from 'reqwest';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const requestUrl = 'http://localhost/tongji/index.php';

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const date = {
  from: yesterday.toISOString(),
  to: today.toISOString()
}


const dataParams = {
  r: 'common/data/getTimeSeries',
  qoq: 0,
  yoy: 0,
  average: 0,
  fill_null: 0,
  data_info: [
  {
    type: 2,
    task_id: 14,
    range: '',
    period: 1,
    factor: 1,
  },
  {
    type: 1,
    stid: '_acpay_',
    sstid: '_acpay_',
    op_fields: '_amt_',
    op_type: 'sum',
    range: '',
    period: 1,
    factor: 0.01,
    precision: 4,
  }
  ],
  exprs: [
  {
    data_name: '新增用户',
    period: 1,
    precision: 0,
    unit: '',
    expr: '{0}',
  },
  {
    data_name: '收入',
    period: 1,
    precision: 2,
    unit: '',
    expr: '{1}',
  }
  ],
  period: 1,
  searchValue: '',
  server_id: -1,
  zone_id: -1,
  platform_id: -1,
};

class LoadingTableRow extends Component {

  state = {
    loading: true,
    data: null
  }

  componentDidMount() {
    reqwest({
      url: requestUrl, 
      method: 'get',
      data: { ...dataParams, ...this.props.configure },
      type: 'json'
    }).then(data => {
      if (data.result === 0) {
        this.setState({
          loading: false,
          data: data.data
        });
      }
    });
  }

  render() {
    const { loading, data } = this.state;
    const { game_name, game_id, gpzs_id } = this.props;

    if (loading) {
      return (
        <TableRow
          selectable={false}
        >
          <TableRowColumn><Link to={`/game/${game_id}/${gpzs_id}`}>{game_name}</Link></TableRowColumn>
          <TableRowColumn colSpan='3'>Loading...</TableRowColumn>
        </TableRow>
      );
    } else if (data) {

      const newer = data[0]['data'][0]['data'][1];
      const yesterday = parseInt(data[0]['data'][1]['data'][0], 10);
      const today = data[0]['data'][1]['data'][1];

      const rate = yesterday ? ((today - yesterday) / yesterday * 100).toFixed(2) + '%' : 'N/A';
      return (
        <TableRow>
          <TableRowColumn><Link to={`/game/${game_id}/${gpzs_id}`}>{game_name}</Link></TableRowColumn>
          <TableRowColumn>{newer}</TableRowColumn>
          <TableRowColumn>{today}</TableRowColumn>
          <TableRowColumn>{rate}</TableRowColumn>
        </TableRow>
      );
    } else {
      return (
        <TableRow>
          <TableRowColumn><Link to={`/game/${game_id}/${gpzs_id}`}>{game_name}</Link></TableRowColumn>
          <TableRowColumn>--</TableRowColumn>
          <TableRowColumn>--</TableRowColumn>
          <TableRowColumn>--</TableRowColumn>
        </TableRow>
      );
    }
  }
}

class GameList extends Component {

  state = {
    loading: true,
    data: null
  }

  componentDidMount() {
    reqwest({
      url: requestUrl, 
      method: 'get',
      data: {
        r: 'common/game/getGameList'
      },
      type: 'json'
    }).then(data => {
      if (data.result === 0) {
        this.setState({
          loading: false,
          data: data.data
        });
      } else {
      }
    });
  }

  render() {
    const { loading, data } = this.state;
    const props = this.props;

    if (loading) {
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>产品</TableHeaderColumn>
              <TableHeaderColumn>新增用户</TableHeaderColumn>
              <TableHeaderColumn>收入</TableHeaderColumn>
              <TableHeaderColumn>收入涨幅</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
              {data.map(item => {
                const dataConfigure = { configure: { ...item, ...props } };
                return <LoadingTableRow key={item.gpzs_id} {...dataConfigure} { ...item } />
              })}
          </TableBody>
        </Table>
      );
    }
  }
}

export default GameList;
