import reqwest from 'reqwest'

import { requestUrl } from './config.json'

export function fetchDayData(configure) {
  return new Promise((resolve, reject) => {
    reqwest({
      url: requestUrl,
      method: 'get',
      type: 'json',
      data: {
        r: 'common/data/getTimeSeries',
        qoq: 0,
        yoy: 0,
        average: 0,
        fill_null: 0,
        period: 1,
        searchValue: '',
        server_id: -1,
        zone_id: -1,
        platform_id: -1,
        ...configure
      }
    }).then((result) => {
      if (result.result === 0) {
        resolve(result.data)
      } else {
      }
    })
  })
}

export function fetchMinuteData(configure) {
  return reqwest({
    url: requestUrl,
    method: 'get',
    type: 'json',
    data: {
      r: 'common/data/getRealTimeSeries',
      qoq: 0,
      yoy: 0,
      average: 0,
      fill_null: 0,
      period: 4,
      searchValue: '',
      server_id: -1,
      zone_id: -1,
      platform_id: -1,
      ...configure
    }
  })
}

export function fetchDistributionData(configure) {
  return reqwest({
    url: requestUrl,
    method: 'get',
    type: 'json',
    data: {
      r: 'common/data/getDistribution',
      qoq: 0,
      yoy: 0,
      average: 0,
      fill_null: 0,
      period: 1,
      searchValue: '',
      server_id: -1,
      zone_id: -1,
      platform_id: -1,
      ...configure
    }
  })
}
