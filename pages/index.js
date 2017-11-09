import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Container, Row, Col } from 'react-grid-system'
import Layout from '../components/MyLayout.js'
import { getInvestments, getIncomes, getToken } from '../components/Api'
import { formatMoney, formatPercent } from '../utils/number'

const COLORS = ['#4eb8ea', '#ac92ec', '#96c823', '#ef5a31', '#FFC107']

class Index extends React.Component {
  static async getInitialProps ({ req }) {
    const res = await getInvestments(getToken(req))
    const investments = res.data
    var investmentsByType = {}

    for (let i = 0; i < investments.length; i++) {
      const investment = investments[i]
      const res = await getIncomes(getToken(req), investment._id)
      investment.incomes = res.data
      if (investment.incomes.length > 0) {
        investment.currentValue = investment.incomes[0].value
      } else {
        investment.currentValue = 0
      }

      var type = investment.type
      if (!investmentsByType[type]) {
        investmentsByType[type] = {}
        investmentsByType[type].investments = []
        investmentsByType[type].value = 0
      }
      investmentsByType[type].investments.push(investment)
      investmentsByType[type].value += investment.currentValue
    }

    var investmentsByTypeChartData = []
    for (let type in investmentsByType) {
      investmentsByTypeChartData.push({ name: type, value: investmentsByType[type].value })
    }

    const totalValue = investments.reduce((acum, investment) => acum + investment.currentValue, 0)

    investmentsByType['Total'] = {}
    investmentsByType['Total'].investments = investments
    investmentsByType['Total'].value = totalValue

    return {
      investments: investments,
      investmentsByType: investmentsByType,
      investmentsByTypeChartData: investmentsByTypeChartData,
      totalValue: totalValue
    }
  }

  render () {
    const { investmentsByType, investmentsByTypeChartData, totalValue } = this.props

    return (
      <Layout title="Dashboard">
        <Card>
          <CardHeader title="Totais por tipo" />
          <CardMedia>
            <Container>
              <Row>
                <Col lg={9}>
                  <Table fixedHeader selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn>Tipo</TableHeaderColumn>
                        <TableHeaderColumn>Total</TableHeaderColumn>
                        <TableHeaderColumn>Perc</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                      {Object.keys(investmentsByType)
                        .sort()
                        .map(type => (
                          <TableRow key={type}>
                            <TableRowColumn>{type}</TableRowColumn>
                            <TableRowColumn>{formatMoney(investmentsByType[type].value, 2)}</TableRowColumn>
                            <TableRowColumn>{formatPercent(investmentsByType[type].value / totalValue, 2)}</TableRowColumn>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Col>
                <Col lg={3}>
                  <ResponsiveContainer height={400}>
                    <PieChart>
                      <Pie data={investmentsByTypeChartData} innerRadius={90} outerRadius={110} fill="#8884d8">
                        {investmentsByTypeChartData.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={value => formatMoney(value, 2)} />
                    </PieChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
            </Container>
          </CardMedia>
        </Card>
      </Layout>
    )
  }
}

Index.propTypes = {
  investments: PropTypes.array.isRequired,
  investmentsByType: PropTypes.object.isRequired,
  investmentsByTypeChartData: PropTypes.array.isRequired,
  totalValue: PropTypes.number.isRequired
}

export default Index
