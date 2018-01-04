import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'

import { formatMoney, formatPercent } from '../../../lib/number'

const InvestmentsTable = ({ investmentsByType, totalValue }) => (
  <Table fixedHeader selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Tipo</TableHeaderColumn>
        <TableHeaderColumn>Total</TableHeaderColumn>
        <TableHeaderColumn>Perc</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} showRowHover stripedRows>
      {Object.keys(investmentsByType || {})
        .sort()
        .map(type => (
          <TableRow key={type}>
            <TableRowColumn>{type}</TableRowColumn>
            <TableRowColumn>{formatMoney(investmentsByType[type].value, 2)}</TableRowColumn>
            <TableRowColumn>{formatPercent(investmentsByType[type].value / totalValue, 2)}</TableRowColumn>
          </TableRow>
        ))}
    </TableBody>
  </Table>
)

InvestmentsTable.propTypes = {
  investmentsByType: PropTypes.object.isRequired,
  totalValue: PropTypes.number.isRequired
}

export default InvestmentsTable
