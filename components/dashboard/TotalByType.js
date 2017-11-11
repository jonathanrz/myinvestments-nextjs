import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Container, Row, Col } from 'react-grid-system'
import { formatMoney, formatPercent } from '../../utils/number'

const COLORS = ['#4eb8ea', '#ac92ec', '#96c823', '#ef5a31', '#FFC107', '#009688']

class TotalByType extends React.Component {
  static propTypes = {
    investmentsByType: PropTypes.object.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    const { investmentsByType } = this.props

    this.investmentsByTypeChartData = []
    for (let type in investmentsByType) {
      if (type !== 'Total') this.investmentsByTypeChartData.push({ name: type, value: investmentsByType[type].value })
    }
  }

  render () {
    const { investmentsByType } = this.props
    const totalValue = investmentsByType['Total'].value

    return (
      <Card>
        <CardHeader title="Totais por tipo" />
        <CardMedia>
          <Container>
            <Row style={{ marginBottom: 30 }}>
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
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={this.investmentsByTypeChartData} innerRadius={90} outerRadius={110} fill="#8884d8">
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

export default TotalByType
