import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { Container, Row, Col } from 'react-grid-system'
import moment from 'moment'
import { Month } from '../../components/Date'
import { Money, MoneyWithColor } from '../../components/Money'
import { PercentWithColor } from '../../components/Percent'
import { hasGrossIROrFee } from '../../lib/income'

const totalId = 'Total'
const selectStyle = { display: 'inline-block', marginLeft: 10 }

const filterInvestment = (investment, type, holder) => {
  if (type === 'all' || investment.type === type) {
    if (holder === 'all') return true
    return investment.holder === holder
  }
  return false
}

class IncomesByMonth extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.id = 1
    this.state = { currentYear: 2017, currentType: 'all', currentHolder: 'all', showValues: true }
    this.onYearSelected = this.onYearSelected.bind(this)
    this.onTypeSelected = this.onTypeSelected.bind(this)
    this.onHolderSelected = this.onHolderSelected.bind(this)
    this.onShowValuesToggle = this.onShowValuesToggle.bind(this)
    this.generateInvestmentData = this.generateInvestmentData.bind(this)
  }

  onYearSelected (event) {
    this.setState({ currentYear: Number(event.target.value) })
  }

  onTypeSelected (event) {
    this.setState({ currentType: event.target.value })
  }

  onHolderSelected (event) {
    this.setState({ currentHolder: event.target.value })
  }

  onShowValuesToggle () {
    this.setState({ showValues: !this.state.showValues })
  }

  componentWillMount () {
    this.generateInvestmentData(this.state)
  }

  componentWillUpdate (nextProps, nextState) {
    this.generateInvestmentData(nextState)
  }

  generateInvestmentData (state) {
    const { investments } = this.props
    const { currentYear, currentType, currentHolder } = state

    var investmentsByMonth = {}
    var investmentTypes = {}
    var investmentHolders = {}
    var grossIrAndFees = []
    var totalValue = 0
    investments.forEach(investment => {
      investmentTypes[investment.type] = null
      investmentHolders[investment.holder] = null
    })
    this.investments = investments.filter(investment => filterInvestment(investment, currentType, currentHolder))
    this.investments.forEach(investment => {
      investment.incomes.filter(income => moment.utc(income.date).year() === currentYear).forEach(income => {
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

        if (hasGrossIROrFee(income)) {
          grossIrAndFees.push({
            investment: investment.name,
            date: income.date,
            value: income.value,
            gross: income.gross,
            ir: income.ir,
            fee: income.fee
          })
        }
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
    this.investmentTypes = investmentTypes
    this.investmentHolders = investmentHolders
    this.grossIrAndFees = grossIrAndFees
  }

  render () {
    const { currentYear, currentType, currentHolder, showValues } = this.state
    const { investments, investmentsByMonth, investmentTypes, investmentHolders, totalValue, grossIrAndFees } = this
    const valueColumnWidth = 100

    return (
      <Card>
        <CardHeader title="Recebimentos por mês" />
        <CardMedia>
          <Container>
            <Row
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                marginRight: 30,
                marginBottom: 10
              }}
            >
              <button style={selectStyle} onClick={this.onShowValuesToggle}>
                {showValues ? '%' : 'R$'}{' '}
              </button>
              <select style={selectStyle} value={currentYear} onChange={this.onYearSelected}>
                <option value="2016">{2016}</option>
                <option value="2017">{2017}</option>
                <option value="2018">{2018}</option>
                <option value="2019">{2019}</option>
              </select>
              <select style={selectStyle} value={currentType} onChange={this.onTypeSelected}>
                <option value="all">Todos os tipos</option>
                {Object.keys(investmentTypes).map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select style={selectStyle} value={currentHolder} onChange={this.onHolderSelected}>
                <option value="all">Todos os titulares</option>
                {Object.keys(investmentHolders).map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Row>
            <Row style={{ marginBottom: 30 }}>
              <Col lg={3}>
                <Table selectable={false}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn>Nome</TableHeaderColumn>
                      <TableHeaderColumn style={{ width: valueColumnWidth }}>Valor</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                    {investments.map(investment => (
                      <TableRow key={investment._id}>
                        <TableRowColumn>{investment.name}</TableRowColumn>
                        <TableRowColumn style={{ width: valueColumnWidth }}>
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
                            {showValues ? (
                              <MoneyWithColor value={investmentsByMonth[month][investment._id].value} />
                            ) : (
                              <PercentWithColor percent={investmentsByMonth[month][investment._id].perc} />
                            )}
                          </TableRowColumn>
                        ))}
                      </TableRow>
                    ))}
                    <TableRow key={0}>
                      {Object.keys(investmentsByMonth).map(month => (
                        <TableRowColumn key={month + totalId}>
                          {showValues ? (
                            <MoneyWithColor value={investmentsByMonth[month][totalId].value} />
                          ) : (
                            <PercentWithColor percent={investmentsByMonth[month][totalId].perc} />
                          )}
                        </TableRowColumn>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </Col>
            </Row>
            <Row style={{ marginBottom: 30 }}>
              <Col>
                <Table selectable={false}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn>Investimento</TableHeaderColumn>
                      <TableHeaderColumn>Date</TableHeaderColumn>
                      <TableHeaderColumn>Valor</TableHeaderColumn>
                      <TableHeaderColumn>Rendimento</TableHeaderColumn>
                      <TableHeaderColumn>IR</TableHeaderColumn>
                      <TableHeaderColumn>Taxa</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                    {grossIrAndFees.map(data => (
                      <TableRow key={this.id++}>
                        <TableRowColumn>{data.investment}</TableRowColumn>
                        <TableRowColumn>
                          <Month date={data.date} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <Money value={data.value} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <MoneyWithColor value={data.gross} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <MoneyWithColor value={data.ir} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <MoneyWithColor value={data.fee} />
                        </TableRowColumn>
                      </TableRow>
                    ))}
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
