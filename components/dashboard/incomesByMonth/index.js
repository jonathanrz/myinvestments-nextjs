import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Container, Row, Col } from 'react-grid-system'

import InvestmentsTable from './investmentsTable'
import MonthTable from './monthTable'
import GrossIrAndFeesTable from './grossIrAndFeesTable'

import { getIncomesByMonth } from '../../../state/data/selector'

class IncomesByMonth extends React.Component {
  static propTypes = {
    incomesByMonth: PropTypes.object.isRequired,
    showValues: PropTypes.bool.isRequired,
    style: PropTypes.object
  }

  render () {
    const { showValues, style, incomesByMonth } = this.props
    const { investments, investmentsByMonth, totalValue, grossIrAndFees } = incomesByMonth

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
  incomesByMonth: getIncomesByMonth(state)
})

export default connect(mapStateToProps, null)(IncomesByMonth)
