import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { Money } from '../../../components/Money'
import { PercentWithColor } from '../../../components/Percent'

const valueColumnStyle = { width: 100 }

const InvestmentsTable = ({ investments, showValues, totalValue }) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Nome</TableHeaderColumn>
        <TableHeaderColumn style={valueColumnStyle}>Valor</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} showRowHover stripedRows>
      {investments.map(investment => (
        <TableRow key={investment._id}>
          <TableRowColumn>{investment.name}</TableRowColumn>
          <TableRowColumn style={valueColumnStyle}>
            {showValues ? <Money value={investment.currentValue} /> : <PercentWithColor percent={investment.currentValue / totalValue} />}
          </TableRowColumn>
        </TableRow>
      ))}
      <TableRow key={0}>
        <TableRowColumn>Total</TableRowColumn>
        <TableRowColumn>{showValues ? <Money value={totalValue} /> : <PercentWithColor percent={1} />}</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
)

InvestmentsTable.propTypes = {
  investments: PropTypes.array.isRequired,
  showValues: PropTypes.bool.isRequired,
  totalValue: PropTypes.number.isRequired
}

export default InvestmentsTable
