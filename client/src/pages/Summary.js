import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List, WhiteSpace, Flex } from 'antd-mobile'

import CustomIcon from '../components/CustomIcon'
import DataRow from '../components/game/summary/DataRow'
import ChartRow from '../components/game/summary/ChartRow'
import PieRow from '../components/game/summary/PieRow'

const primaryDataConfigure = {
  index: [ 'income' ],
  data_info: [
  { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, },
  ],
  exprs: [
  { period: 1, precision: 2, unit: '', expr: '{0}', data_name: '今日收入' }
  ]
}

const keyDayDataConfigure = {
  index: [ 'payer', 'newer', 'activer', 'pcu', 'acu' ],
  data_info: [
  { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '', op_type: 'ucount', range: '', period: 1, factor: 1, },
  { type: 2, task_id: 14, range: '', period: 1, factor: 1, },
  { type: 1, stid: '_lgac_', sstid: '_lgac_', op_fields: '', op_type: 'ucount', range: '', period: 1, factor: 1, },
  { type: 2, task_id: 92, range: '_all_', period: 1, factor: 1, },
  { type: 2, task_id: 91, range: '_all_', period: 1, factor: 1, },
  ],
  exprs: [
  { period: 1, precision: 0, unit: '', expr: '{0}', data_name: '付费账号' },
  { period: 1, precision: 0, unit: '', expr: '{1}', data_name: '新增账号' },
  { period: 1, precision: 0, unit: '', expr: '{2}', data_name: '活跃账号' },
  { period: 1, precision: 0, unit: '', expr: '{3}', data_name: '最高在线' },
  { period: 1, precision: 0, unit: '', expr: '{4}', data_name: '平均在线' },
  ],
}
const keyMinuteDataConfigure = {
  index: [ 'olcnt' ],
  data_info: [
  { type: 1, stid: '_olcnt_', sstid: '_olcnt_', op_fields: '_zone_,_olcnt_', op_type: 'max', period: 4, factor: 1, data_name: '当前在线' },
  ]
}
const drawDataConfigure = {
  index: [ 'newer', 'activer', 'income', 'payer' ],
  configure: [
  {
    data_info: [
    { type: 2, task_id: 14, range: '', period: 1, factor: 1, },
    ],
    exprs: [
    { period: 1, precision: 0, unit: '', expr: '{0}', data_name: '新增账号' },
    ],
  },
  {
    data_info: [
    { type: 1, stid: '_lgac_', sstid: '_lgac_', op_fields: '', op_type: 'ucount', range: '', period: 1, factor: 1, },
    ],
    exprs: [
    { period: 1, precision: 0, unit: '', expr: '{0}', data_name: '活跃账号' },
    ],
  },
  {
    data_info: [
    { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, },
    ],
    exprs: [
    { period: 1, precision: 2, unit: '', expr: '{0}', data_name: '付费金额' },
    ]
  },
  {
    data_info: [
    { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '', op_type: 'ucount', range: '', period: 1, factor: 1, },
    ],
    exprs: [
    { period: 1, precision: 0, unit: '', expr: '{0}', data_name: '付费账号' },
    ]
  },
  ]
}

const pieConfigure = {
  data_info: [
  { sort_type: 3, distr_name: '新增分布', dimen_name: '平台', distr_by: 1, distr_type: 1, data: 0, period: 1, data_name: '新增分布', type: 2, task_id: 14, range: '', factor: 1, precision: 0 }
  ]
}

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `${dateStr}`;
}

const today = new Date()
const startDate = new Date();
startDate.setDate(today.getDate() - 14);

const keyTimeSlot = {
  from: formatDate(today),
  to: formatDate(today)
}
const drawTimeSlot = {
  from: formatDate(startDate),
  to: formatDate(today)
}
const colors = [
  "rgb(28,  184, 65)",
  "rgb(223, 117, 20)",
  "rgb(255, 61,  103)",
  "rgb(0,   120, 231)",
  "rgb(255, 194, 51)",
  "rgb(120,   0, 231)",
]

class Summary extends Component {

  componentWillMount() {

    const { match, games } = this.props
    const { gameId } = match.params

    this.game = games.games.find((game) => {
      return game.game_id === gameId
    })
  }

  render() {

    const game = this.game

    return (
      <div>
        <DataRow className="summary-title" day={primaryDataConfigure} game_id={game.game_id} gpzs_id={game.gpzs_id} {...keyTimeSlot} />
        <List className="data-links">
          <List.Item>
            <DataRow insertIndex={3} day={keyDayDataConfigure} minute={keyMinuteDataConfigure} game_id={game.game_id} gpzs_id={game.gpzs_id} {...keyTimeSlot} />
          </List.Item>
        </List>
        <List className="chart-row" renderHeader={() => ('关键指标')}>
          {drawDataConfigure.configure.map((configure, index) => {
            return (
              <List.Item key={configure.exprs[0].data_name}>
                <ChartRow game_id={game.game_id} gpzs_id={game.gpzs_id} color={colors[index%2]} {...drawTimeSlot} {...configure} index={drawDataConfigure.index[index]} />
                <WhiteSpace size="lg" />
              </List.Item>
            )
          })}
        </List>
        <List renderHeader={() => ('平台/渠道')}>
          <List.Item><PieRow game_id={game.game_id} gpzs_id={game.gpzs_id} colors={colors} {...pieConfigure} {...drawTimeSlot} /></List.Item>
        </List>
        <List className="icon-links" renderHeader={() => ('其他')}>
          <List.Item>
            <Flex>
              <Flex.Item>
                <CustomIcon type={require("../assets/svg/retain.svg")} />
                <Link to={`/detail/${game.game_id}/retention`}>留存用户</Link>
              </Flex.Item>
              <Flex.Item>
                <CustomIcon type={require("../assets/svg/paid_penetration.svg")} />
                <Link to={`/detail/${game.game_id}/penetration`}>付费渗透</Link>
              </Flex.Item>
            </Flex>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    games: store.games
  }
})(Summary)
