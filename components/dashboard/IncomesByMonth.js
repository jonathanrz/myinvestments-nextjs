import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { Container, Row, Col } from 'react-grid-system'
import moment from 'moment'
import { Month } from '../../components/Date'
import { Money, MoneyWithColor } from '../../components/Money'

const totalId = 'Total'

class IncomesByMonth extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    const { investments } = this.props

    var investmentsByMonth = {}
    var totalValue = 0
    investments.forEach(investment => {
      investment.incomes.filter(income => moment(income.date).year() === 2017).forEach(income => {
        var monthData = investmentsByMonth[income.date]
        if (!monthData) monthData = []
        var investmentData = monthData[investment._id]
        if (!investmentData) investmentData = {}

        investmentData.value = income.gain
        investmentData.perc = income.gainInPerc

        var totalData = monthData[totalId]
        if (!totalData) {
          totalData = {}
          totalData.value = 0
          totalData.perc = 0
        }

        totalData.value += income.gain
        totalData.perc += income.gainInPerc
        totalData.perc /= 2

        monthData[investment._id] = investmentData
        monthData[totalId] = totalData
        investmentsByMonth[income.date] = monthData
      })

      totalValue += investment.currentValue
    })

    Object.keys(investmentsByMonth).map(month => {
      investments.forEach(investment => {
        if (!investmentsByMonth[month][investment._id]) {
          investmentsByMonth[month][investment._id] = { value: 0, perc: 0 }
        }
      })
    })

    this.totalValue = totalValue
    this.investmentsByMonth = investmentsByMonth
  }

  render () {
    const { investments } = this.props
    const { investmentsByMonth } = this

    return (
      <Card>
        <CardHeader title="Recebimentos por mês" />
        <CardMedia>
          <Container>
            <Row>
              <Col lg={3}>
                <Table selectable={false}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn>Nome</TableHeaderColumn>
                      <TableHeaderColumn style={{ width: 100 }}>Valor</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                    {investments.map(investment => (
                      <TableRow key={investment._id}>
                        <TableRowColumn>{investment.name}</TableRowColumn>
                        <TableRowColumn style={{ width: 100 }}>
                          <Money value={investment.currentValue} />
                        </TableRowColumn>
                      </TableRow>
                    ))}
                    <TableRowColumn>Total</TableRowColumn>
                    <TableRowColumn>
                      <Money value={this.totalValue} />
                    </TableRowColumn>
                  </TableBody>
                </Table>
              </Col>
              <Col lg={9}>
                <Table selectable={false}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      {Object.keys(investmentsByMonth).map(month => (
                        <TableHeaderColumn key={month}>
                          <Month date={month} />
                        </TableHeaderColumn>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                    {investments.map(investment => (
                      <TableRow key={investment._id}>
                        {Object.keys(investmentsByMonth).map(month => (
                          <TableRowColumn key={month + investment._id}>
                            <MoneyWithColor value={investmentsByMonth[month][investment._id].value} />
                          </TableRowColumn>
                        ))}
                      </TableRow>
                    ))}
                    <TableRow key={0}>
                      {Object.keys(investmentsByMonth).map(month => (
                        <TableRowColumn key={month + totalId}>
                          <MoneyWithColor value={investmentsByMonth[month][totalId].value} />
                        </TableRowColumn>
                      ))}
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

export default IncomesByMonth
