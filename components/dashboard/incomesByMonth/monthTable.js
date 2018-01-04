import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { Month } from '../../../components/Date'
import { MoneyWithColor } from '../../../components/Money'
import { PercentWithColor } from '../../../components/Percent'

const totalId = 'Total'

const MonthTable = ({ investments, investmentsByMonth, showValues }) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        {investmentsByMonth.map(({ month }) => (
          <TableHeaderColumn key={month}>
            <Month date={month} />
          </TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} showRowHover stripedRows>
      {investments.map(investment => (
        <TableRow key={investment._id}>
          {investmentsByMonth.map(({ month, investments }) => (
            <TableRowColumn key={month + investment._id}>
              {showValues ? <MoneyWithColor value={investments[investment._id].value} /> : <PercentWithColor percent={investments[investment._id].perc} />}
            </TableRowColumn>
          ))}
        </TableRow>
      ))}
      <TableRow key={0}>
        {investmentsByMonth.map(({ month, investments }) => (
          <TableRowColumn key={month + totalId}>
            {showValues ? <MoneyWithColor value={investments[totalId].value} /> : <PercentWithColor percent={investments[totalId].perc} />}
          </TableRowColumn>
        ))}
      </TableRow>
    </TableBody>
  </Table>
)

MonthTable.propTypes = {
  investments: PropTypes.array.isRequired,
  investmentsByMonth: PropTypes.array.isRequired,
  showValues: PropTypes.bool.isRequired
}

export default MonthTable
