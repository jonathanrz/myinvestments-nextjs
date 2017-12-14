import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Container, Row, Col } from 'react-grid-system'
import { formatMoney } from '../../../lib/number'

import InvestmentsTable from './investmentsTable'

const COLORS = ['#4eb8ea', '#ac92ec', '#96c823', '#ef5a31', '#FFC107', '#009688']

export class TotalByType extends React.Component {
  static propTypes = {
    investmentsByType: PropTypes.object.isRequired,
    style: PropTypes.object
  }

  componentWillMount () {
    this.generateInvestmentData(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.generateInvestmentData(nextProps)
  }

  generateInvestmentData = props => {
    const { investmentsByType } = props

    this.investmentsByTypeChartData = []
    for (let type in investmentsByType) {
      if (type !== 'Total') this.investmentsByTypeChartData.push({ name: type, value: investmentsByType[type].value })
    }
  }

  render () {
    const { investmentsByType, style } = this.props
    const totalValue = investmentsByType && investmentsByType['Total'] ? investmentsByType['Total'].value : 0

    return (
      <Card containerStyle={style || {}}>
        <CardHeader title="Totais por tipo" />
        <CardMedia>
          <Container>
            <Row style={{ marginBottom: 30 }}>
              <Col lg={9}>
                <InvestmentsTable investmentsByType={investmentsByType} totalValue={totalValue} />
              </Col>
              <Col lg={3}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie dataKey="value" data={this.investmentsByTypeChartData} innerRadius={90} outerRadius={110} fill="#8884d8">
                      {this.investmentsByTypeChartData.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={value => formatMoney(value, 2)} />
                  </PieChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </Container>
        </CardMedia>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  investmentsByType: state.data.filteredInvestments.byType
})

export default connect(mapStateToProps, null)(TotalByType)
