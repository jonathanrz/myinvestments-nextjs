import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Container, Row, Col } from 'react-grid-system'

import InvestmentsTable from './investmentsTable'
import MonthTable from './MonthTable'
import GrossIrAndFeesTable from './grossIrAndFeesTable'
import { hasGrossIROrFee } from '../../lib/income'

const totalId = 'Total'

class IncomesByMonth extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired,
    showValues: PropTypes.bool.isRequired,
    style: PropTypes.object
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.id = 1
    this.generateInvestmentData = this.generateInvestmentData.bind(this)
    this.investmentsByMonth = {}
    this.investments = []
  }

  componentWillMount () {
    this.generateInvestmentData(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.generateInvestmentData(nextProps)
  }

  generateInvestmentData = props => {
    const { investments } = props

    var investmentsByMonth = {}
    var grossIrAndFees = []
    var totalValue = 0
    investments.forEach(investment => {
      investment.filteredIncomes.forEach(income => {
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
            holder: investment.holder,
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

    const investmentsByMonthArray = []

    Object.keys(investmentsByMonth).map(month => {
      investmentsByMonthArray.push({
        month: month,
        investments: investmentsByMonth[month]
      })
    })

    this.totalValue = totalValue
    this.investmentsByMonth = investmentsByMonthArray
    this.grossIrAndFees = grossIrAndFees.sort((left, right) => moment.utc(left.date).diff(moment.utc(right.date)))
  }

  render () {
    const { investments, showValues, style } = this.props
    const { investmentsByMonth, totalValue, grossIrAndFees } = this

    return (
      <Card containerStyle={style || {}}>
        <CardHeader title="Recebimentos por mês" />
        <CardMedia>
          <Container>
            <Row style={{ paddingBottom: 30 }}>
              <Col lg={3}>
                <InvestmentsTable investments={investments} showValues={showValues} totalValue={totalValue} />
              </Col>
              <Col lg={9}>
                <MonthTable investments={investments} investmentsByMonth={investmentsByMonth} showValues={showValues} totalValue={totalValue} />
              </Col>
            </Row>
            {grossIrAndFees.length > 0 && (
              <Row style={{ paddingTop: 30, paddingBottom: 30 }}>
                <Col lg={10}>
                  Taxas e Rendimentos
                  <GrossIrAndFeesTable grossIrAndFees={grossIrAndFees} />
                </Col>
              </Row>
            )}
          </Container>
        </CardMedia>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  showValues: state.filter.showValues,
  investments: state.data.filteredInvestments.investments
})

export default connect(mapStateToProps, null)(IncomesByMonth)
