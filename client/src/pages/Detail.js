import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'

import Loading from '../components/Loading'
import SliceContainer from '../components/game/detail/SliceContainer'
import Tool from '../components/game/detail/Tool'


const dataConfigure = {
  payer: {
    configure: [{
      name: '付费用户数',
      data_info: [
      { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '', op_type: 'ucount', range: '', period: 1, factor: 1, },
      ],
      exprs: [
      { period: 1, precision: 0, unit: '', expr: '{0}' }
      ]
    }],
  },
  income: {
    configure: [{
      name: '收入总额（元）',
      data_info: [
      { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, },
      ],
      exprs: [
      { period: 1, precision: 2, unit: '', expr: '{0}' }
      ]
    }],
  },
  newer: {
    configure: [{
      name: '新增用户数',
      data_info: [
      { type: 2, task_id: 14, range: '', period: 1, factor: 1, },
      ],
      exprs: [
      { period: 1, precision: 0, unit: '', expr: '{0}' }
      ]
    }],
  },
  activer: {
    configure: [{
      name: '活跃用户数',
      data_info: [
      { type: 1, stid: '_lgac_', sstid: '_lgac_', op_fields: '', op_type: 'ucount', range: '', period: 1, factor: 1, },
      ],
      exprs: [
      { period: 1, precision: 0, unit: '', expr: '{0}' }
      ]
    }],
  },
  pcu: {
    configure: [{
      name: 'PCU',
      data_info: [
      { type: 2, task_id: 92, range: '_all_', period: 1, factor: 1, },
      ],
      exprs: [
      { period: 1, precision: 0, unit: '', expr: '{0}' }
      ]
    }],
  },
  acu: {
    configure: [{
      name: 'ACU',
      data_info: [
      { type: 2, task_id: 91, range: '_all_', period: 1, factor: 1, },
      ],
      exprs: [
      { period: 1, precision: 0, unit: '', expr: '{0}' }
      ]
    }],
  },
  olcnt: {
    minute: true,
    configure: [{
      name: '在线人数',
      data_info: [
      { type: 1, stid: '_olcnt_', sstid: '_olcnt_', op_fields: '_zone_,_olcnt_', op_type: 'max', period: 4, factor: 1, },
      ]
    }]
  },
  retention: {
    configure: [
    {
      name: '新增留存',
      chart: false,
      data_info: [
      { type: 2, task_id: 20, range: 1, factor: 100, precision: 2, data_name: '新增用户次日留存率' },
      { type: 2, task_id: 20, range: 2, factor: 100, precision: 2, data_name: '新增用户2日留存率' },
      { type: 2, task_id: 20, range: 3, factor: 100, precision: 2, data_name: '新增用户3日留存率' },
      { type: 2, task_id: 20, range: 4, factor: 100, precision: 2, data_name: '新增用户4日留存率' },
      { type: 2, task_id: 20, range: 5, factor: 100, precision: 2, data_name: '新增用户5日留存率' },
      { type: 2, task_id: 20, range: 6, factor: 100, precision: 2, data_name: '新增用户6日留存率' },
      { type: 2, task_id: 20, range: 7, factor: 100, precision: 2, data_name: '新增用户7日留存率' },
      ],
    },
    {
      name: '活跃留存',
      chart: false,
      data_info: [
      { type: 1, stid: '_lgac_', sstid: '_lgac_', op_fields: '', op_type: 'ucount', range: '', },
      { type: 2, task_id: 21, range: 1, precision: 4, },
      { type: 2, task_id: 21, range: 7, precision: 4, },
      { type: 2, task_id: 21, range: 14, precision: 4, },
      { type: 2, task_id: 21, range: 30, precision: 4, },
      ],
      exprs: [
      { data_name: '活跃用户次日留存率', precision: 2, expr: '{1}/{0}*100' },
      { data_name: '活跃用户7日留存率', precision: 2, expr: '{2}/{0}*100' },
      { data_name: '活跃用户14日留存率', precision: 2, expr: '{3}/{0}*100' },
      { data_name: '活跃用户30日留存率', precision: 2, expr: '{4}/{0}*100' },
      ],
    },
    ]
  },
  penetration: {
    configure: [
    {
      name: '付费率',
      data_info: [
      { type: 1, stid: '_lgac_', sstid: '_lgac_', op_fields: '', op_type: 'ucount', range: '', period: 1 },
      { type: 1, stid: '_acpay_', sstid: '_buyitem_', op_fields: '', op_type: 'ucount', range: '', period: 1 },
      { type: 1, stid: '_acpay_', sstid: '_vipmonth_', op_fields: '', op_type: 'ucount', range: '', period: 1 },
      { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '', op_type: 'ucount', range: '', period: 1 },
      ],
      exprs: [
      { data_name: '按条付费率', precision: 2, expr: '{1}/{0}*100' },
      { data_name: '包月付费率', precision: 2, expr: '{2}/{0}*100' },
      { data_name: '付费率', precision: 2, expr: '{3}/{0}*100' },
      ]
    },
    {
      name: 'ARPU',
      data_info: [
      { type: 1, stid: '_lgac_', sstid: '_lgac_', op_fields: '', op_type: 'ucount', range: '', period: 1 },
      { type: 1, stid: '_acpay_', sstid: '_buyitem_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, precision: 4 },
      { type: 1, stid: '_acpay_', sstid: '_vipmonth_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, precision: 4 },
      { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, precision: 4 },
      ],
      exprs: [
      { data_name: '按条Arpu值', precision: 2, expr: '{1}/{0}' },
      { data_name: '包月Arpu值', precision: 2, expr: '{2}/{0}' },
      { data_name: 'Arpu值', precision: 2, expr: '{3}/{0}' },
      ]
    },
    {
      name: 'ARPPU',
      data_info: [
      { type: 1, stid: '_acpay_', sstid: '_buyitem_', op_fields: '', op_type: 'ucount', range: '', period: 1, },
      { type: 1, stid: '_acpay_', sstid: '_buyitem_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, precision: 4 },
      { type: 1, stid: '_acpay_', sstid: '_vipmonth_', op_fields: '', op_type: 'ucount', range: '', period: 1, },
      { type: 1, stid: '_acpay_', sstid: '_vipmonth_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, precision: 4 },
      { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '', op_type: 'ucount', range: '', period: 1, },
      { type: 1, stid: '_acpay_', sstid: '_acpay_', op_fields: '_amt_', op_type: 'sum', range: '', period: 1, factor: 0.01, precision: 4 },
      ],
      exprs: [
      { data_name: '按条Arppu值', precision: 2, expr: '{1}/{0}' },
      { data_name: '包月Arppu值', precision: 2, expr: '{3}/{2}' },
      { data_name: 'Arppu值', precision: 2, expr: '{5}/{4}' },
      ]
    },
    ]
  },
}

const today = new Date()
function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `${dateStr}`;
}

function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>
  )
}

class Detail extends Component {

  state = {
    params: {
      gpzs_id: null,
      game_id: null,
      from: null,
      to: null,
    },
    loadConfigure: null,
    minute: false,
  }

  componentWillMount() {
    this.loadConfigure(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadConfigure(nextProps)
  }

  loadConfigure(props) {

    const { match } = props
    const { gameId, dataIndex } = match.params
    const loadConfigure = dataConfigure[dataIndex] ? dataConfigure[dataIndex] : dataConfigure['payer']
    const minute = loadConfigure.minute || false
    const game = this.props.games.games.find((game) => {
      return game.game_id === gameId
    })
    let from = new Date()
    minute || from.setDate(today.getDate() - 15)

    const params = {
      ...this.state.params,
      game_id: gameId,
      gpzs_id: game.gpzs_id,
      from: formatDate(from), 
      to: formatDate(today)
    }
    this.setState({
      params,
      minute,
      loadConfigure: loadConfigure.configure
    })
  }

  filter = (gpzsId, from, to) => {
    const params = {
      ...this.state.params,
      gpzs_id: gpzsId,
      from,
      to
    }
    this.setState({ params })
  }

  render() {

		const { loadConfigure, minute, params } = this.state
		const { game } = this.props

		if (!game.fetched) {
			return (
				<Loading />
			)
		}

    const tabs = loadConfigure.map(configure => {
      return {
        title: configure.name
      }
    })
    const contents = loadConfigure.map(configure => {
      return (
        <SliceContainer key={configure.name} configure={configure} params={params} minute={minute} />
      )
    })

    return (
      <div>
        <StickyContainer>
          <Tool game={game} gpzsId={params.gpzs_id} filter={this.filter} />
          <Tabs tabs={tabs}
            renderTabBar={renderTabBar}
          >
            {contents}
          </Tabs>
        </StickyContainer>
			</div>
    );
  }
}

export default connect((store) => {
  return {
    games: store.games,
    game: store.game,
  }
})(Detail)
