import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import Layout from '../components/MyLayout.js'
import { getInvestment, getIncomes, getToken } from '../components/Api'

class Index extends React.Component {
  static async getInitialProps ({ query, req }) {
    const investment = await getInvestment(getToken(req), query.id)
    const incomes = await getIncomes(getToken(req), query.id)

    return {
      investment: investment.data,
      incomes: incomes.data
    }
  }

  render () {
    const { investment, incomes } = this.props

    return (
      <Layout
        title={investment.name}
        detail={true}
        onNavigationClose={() => {
          Router.push('/')
        }}
      >
        <Card>
          <CardHeader
            title={investment.type}
            subtitle={investment.holder}
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardMedia>
            <Table height={500} fixedHeader selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Data</TableHeaderColumn>
                  <TableHeaderColumn>Quantidade</TableHeaderColumn>
                  <TableHeaderColumn>Valor</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                {incomes.map(item => (
                  <TableRow key={item._id}>
                    <TableRowColumn>{item.date}</TableRowColumn>
                    <TableRowColumn>{item.quantity}</TableRowColumn>
                    <TableRowColumn>{item.value}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardMedia>
          <CardActions>
            <FlatButton label="Novo Rendimento" />
          </CardActions>
        </Card>
      </Layout>
    )
  }
}

Index.propTypes = {
  investment: PropTypes.element.isRequired
}

export default Index
