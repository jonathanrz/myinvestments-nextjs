import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { Container, Row, Col } from 'react-grid-system'
import { Money, MoneyWithColor } from '../../components/Money'
import { PercentWithColor } from '../../components/Percent'

class TotalBought extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired,
    style: PropTypes.object
  }

  componentWillMount () {
    this.prepareData(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.prepareData(nextProps)
  }

  prepareData = props => {
    const { investments } = props

    this.data = []
    this.totalBought = 0
    this.totalGain = 0
    this.maxMonths = 0

    investments.forEach(investment => {
      var total = {
        name: investment.name,
        holder: investment.holder,
        months: investment.filteredIncomes.length || 0,
        bought: 0,
        gain: 0
      }
      investment.filteredIncomes.forEach(income => {
        total.bought += income.bought || 0
        total.gain += income.gain
      })
      this.totalBought += total.bought
      this.totalGain += total.gain
      if (total.months > this.maxMonths) {
        this.maxMonths = total.months
      }

      this.data.push(total)
    })

    this.id = 1
  }

  render () {
    const { style } = this.props
    const { data, totalBought, totalGain, maxMonths } = this

    return (
      <Card containerStyle={style || {}}>
        <CardHeader title="Total geral" />
        <CardMedia>
          <Container>
            <Row style={{ marginBottom: 30 }}>
              <Col>
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
                    {data.map(total => (
                      <TableRow key={this.id++}>
                        <TableRowColumn>{total.name}</TableRowColumn>
                        <TableRowColumn>{total.holder}</TableRowColumn>
                        <TableRowColumn>{total.months}</TableRowColumn>
                        <TableRowColumn>
                          <Money value={total.bought} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <MoneyWithColor value={total.gain} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <PercentWithColor percent={total.gain / total.bought} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <PercentWithColor percent={total.gain / total.bought / total.months} />
                        </TableRowColumn>
                      </TableRow>
                    ))}
                    <TableRow key={this.id++}>
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
              </Col>
            </Row>
          </Container>
        </CardMedia>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  investments: state.data.filteredInvestments.investments
})

export default connect(mapStateToProps, null)(TotalBought)
