import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading'
import GamesTableRow from './GamesTableRow'

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const date = {
  from: yesterday.toISOString(),
  to: today.toISOString()
}

class GamesTable extends Component {

  render() {

    const { games, fetched } = this.props.games

    if (!fetched) {
      return (
        <Loading />
      );
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>产品</th>
              <th>新增用户</th>
              <th>收入</th>
              <th>收入涨幅</th>
            </tr>
          </thead>
          <tbody>
            {games.map(item => {
              const dataConfigure = { configure: { ...item, ...date } };
              return <GamesTableRow key={item.gpzs_id} {...dataConfigure} { ...item } />
            })}
          </tbody>
        </table>
      )
    }
  }
}

export default connect((store) => {
  return {
    games: store.games,
  }
})(GamesTable);
