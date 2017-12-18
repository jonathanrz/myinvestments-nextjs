import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Container, Row, Col } from 'react-grid-system'
import InvestmentsTable from './investmentsTable'

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
        months: investment.incomes.length || 0,
        bought: 0,
        gain: 0
      }
      investment.incomes.forEach(income => {
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
                <InvestmentsTable data={data} totalBought={totalBought} totalGain={totalGain} maxMonths={maxMonths} />
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
