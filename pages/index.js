import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import Layout from '../components/MyLayout.js'
import { getInvestments, getIncomes, getToken } from '../components/Api'
import { formatMoney } from '../utils/number'

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
      if (!investmentsByType[type]) investmentsByType[type] = []
      investmentsByType[type].push(investment)
    }

    investmentsByType['Total'] = investments

    return {
      investments: investments,
      investmentsByType: investmentsByType
    }
  }

  render () {
    const { investmentsByType } = this.props
    return (
      <Layout title="Dashboard">
        <Card style={{ width: '50%' }}>
          <CardHeader title="Totais por tipo" />
          <CardMedia>
            <Table fixedHeader selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Tipo</TableHeaderColumn>
                  <TableHeaderColumn>Total</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                {Object.keys(investmentsByType)
                  .sort()
                  .map(type => (
                    <TableRow key={type}>
                      <TableRowColumn>{type}</TableRowColumn>
                      <TableRowColumn>{formatMoney(investmentsByType[type].reduce((acum, investment) => acum + investment.currentValue, 0), 2)}</TableRowColumn>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardMedia>
        </Card>
      </Layout>
    )
  }
}

Index.propTypes = {
  investments: PropTypes.array.isRequired,
  investmentsByType: PropTypes.element.isRequired
}

export default Index
