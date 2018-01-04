import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'

import { Month } from '../../../components/Date'
import { Money, MoneyWithColor, MoneyWithInvertedColor } from '../../../components/Money'

const valueColumnStyle = { width: 100 }
const holderColumnStyle = { width: 150 }

var id = 1

const GrossIrAndFeesTable = ({ grossIrAndFees }) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Investimento</TableHeaderColumn>
        <TableHeaderColumn style={holderColumnStyle}>Titular</TableHeaderColumn>
        <TableHeaderColumn style={valueColumnStyle}>Date</TableHeaderColumn>
        <TableHeaderColumn style={valueColumnStyle}>Valor</TableHeaderColumn>
        <TableHeaderColumn style={valueColumnStyle}>Rendimento</TableHeaderColumn>
        <TableHeaderColumn style={valueColumnStyle}>IR</TableHeaderColumn>
        <TableHeaderColumn style={valueColumnStyle}>Taxa</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} showRowHover stripedRows>
      {grossIrAndFees.map(data => (
        <TableRow key={id++}>
          <TableRowColumn>{data.investment}</TableRowColumn>
          <TableRowColumn style={holderColumnStyle}>{data.holder}</TableRowColumn>
          <TableRowColumn style={valueColumnStyle}>
            <Month date={data.date} />
          </TableRowColumn>
          <TableRowColumn style={valueColumnStyle}>
            <Money value={data.value} />
          </TableRowColumn>
          <TableRowColumn style={valueColumnStyle}>
            <MoneyWithColor value={data.gross} />
          </TableRowColumn>
          <TableRowColumn style={valueColumnStyle}>
            <MoneyWithInvertedColor value={data.ir} />
          </TableRowColumn>
          <TableRowColumn style={valueColumnStyle}>
            <MoneyWithInvertedColor value={data.fee} />
          </TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

GrossIrAndFeesTable.propTypes = {
  grossIrAndFees: PropTypes.array.isRequired
}

export default GrossIrAndFeesTable
