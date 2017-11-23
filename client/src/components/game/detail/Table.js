import React, { Component } from 'react'

class Table extends Component {

  render() {

    let { name, dates, data } = this.props
    data.map((data) => {
      return {
        ...data,
        data: data.data.reverse()
      }
    })

    return (
      <table>
        <thead>
          <tr>
            <th>日期</th>
            {data.map((data, i) => {
              return (
                <th key={i}>{data.name ? data.name : name}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {dates.reverse().map((date, index) => {
            return (
              <tr 
                key={date}
              >
                <td>{date}</td>
                {data.map((data, i) => {
                  return (
                    <td key={`${index}_${i}`}>{data.data[index]}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Table
