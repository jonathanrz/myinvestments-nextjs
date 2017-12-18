import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { Money, MoneyWithColor } from '../../../components/Money'
import { PercentWithColor } from '../../../components/Percent'

const InvestmentsTable = ({ data, maxMonths, totalBought, totalGain }) => (
  <Table fixedHeader selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Investimento</TableHeaderColumn>
        <TableHeaderColumn>Titular</TableHeaderColumn>
        <TableHeaderColumn>Meses</TableHeaderColumn>
        <TableHeaderColumn>Comprado</TableHeaderColumn>
        <TableHeaderColumn>Ganho</TableHeaderColumn>
        <TableHeaderColumn>% Geral</TableHeaderColumn>
        <TableHeaderColumn>% Mês</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} showRowHover stripedRows>
      {data.map(investment => (
        <TableRow key={`${investment.name}-${investment.holder}`}>
          <TableRowColumn>{investment.name}</TableRowColumn>
          <TableRowColumn>{investment.holder}</TableRowColumn>
          <TableRowColumn>{investment.months}</TableRowColumn>
          <TableRowColumn>
            <Money value={investment.bought} />
          </TableRowColumn>
          <TableRowColumn>
            <MoneyWithColor value={investment.gain} />
          </TableRowColumn>
          <TableRowColumn>
            <PercentWithColor percent={investment.gain / investment.bought} />
          </TableRowColumn>
          <TableRowColumn>
            <PercentWithColor percent={investment.gain / investment.bought / investment.months} />
          </TableRowColumn>
        </TableRow>
      ))}
      <TableRow key="Total">
        <TableRowColumn>Total</TableRowColumn>
        <TableRowColumn />
        <TableRowColumn>{maxMonths}</TableRowColumn>
        <TableRowColumn>
          <Money value={totalBought} />
        </TableRowColumn>
        <TableRowColumn>
          <MoneyWithColor value={totalGain} />
        </TableRowColumn>
        <TableRowColumn>
          <PercentWithColor percent={totalGain / totalBought} />
        </TableRowColumn>
        <TableRowColumn>
          <PercentWithColor percent={totalGain / totalBought / maxMonths} />
        </TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
)

InvestmentsTable.propTypes = {
  data: PropTypes.array.isRequired,
  maxMonths: PropTypes.number.isRequired,
  totalBought: PropTypes.number.isRequired,
  totalGain: PropTypes.number.isRequired
}

export default InvestmentsTable
