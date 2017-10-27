import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import Layout from '../components/MyLayout.js'
import Date from '../components/Date'
import { Money, MoneyWithColor } from '../components/Money'
import { PercentWithColor } from '../components/Percent'
import { getInvestment, getIncomes, getToken } from '../components/Api'
import { routeToRoot, routeToNewIncome, routeToEditIncome } from '../components/Router.js'

class Index extends React.Component {
  static async getInitialProps ({ query, req }) {
    const investment = await getInvestment(getToken(req), query.id)
    const incomes = await getIncomes(getToken(req), query.id)
    var lastIncomeValue = 0

    return {
      investment: investment.data,
      incomes: incomes.data
        .reverse()
        .map(item => {
          if (lastIncomeValue === 0) {
            item.gain = 0
            item.gainInPerc = 0
          } else {
            item.gain = item.value - lastIncomeValue - (item.bought || 0)
            item.gainInPerc = item.gain / lastIncomeValue
          }
          lastIncomeValue = item.value
          return item
        })
        .reverse()
    }
  }

  constructor (props) {
    super(props)
    this.state = { token: '' }

    this.onNewIncome = this.onNewIncome.bind(this)
    this.onIncomeCell = this.onIncomeCell.bind(this)
  }

  onNewIncome () {
    routeToNewIncome(this.props.investment._id)
  }

  onIncomeCell (index) {
    const income = this.props.incomes[index]
    routeToEditIncome(this.props.investment._id, income._id)
  }

  render () {
    const { investment, incomes } = this.props

    return (
      <Layout
        title={investment.name}
        detail={true}
        onNavigationClose={() => {
          routeToRoot()
        }}
      >
        <Card>
          <CardHeader title={investment.type} subtitle={investment.holder} actAsExpander={false} showExpandableButton={false} />
          <CardMedia>
            <Table height={500} fixedHeader selectable={false} bodyStyle={{ overflowY: 'hidden' }} onCellClick={this.onIncomeCell}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Data</TableHeaderColumn>
                  <TableHeaderColumn>Quantidade</TableHeaderColumn>
                  <TableHeaderColumn>Valor</TableHeaderColumn>
                  <TableHeaderColumn>Comprado</TableHeaderColumn>
                  <TableHeaderColumn>Ganho/Perda</TableHeaderColumn>
                  <TableHeaderColumn>Ganho/Perda %</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                {incomes.map(item => (
                  <TableRow key={item._id}>
                    <TableRowColumn>
                      <Date date={item.date} />
                    </TableRowColumn>
                    <TableRowColumn>{item.quantity}</TableRowColumn>
                    <TableRowColumn>
                      <Money value={item.value} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <Money value={item.bought} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <MoneyWithColor value={item.gain} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <PercentWithColor percent={item.gainInPerc} />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardMedia>
          <CardActions>
            <FlatButton label="Novo Rendimento" onClick={this.onNewIncome} />
          </CardActions>
        </Card>
      </Layout>
    )
  }
}

Index.propTypes = {
  investment: PropTypes.element.isRequired,
  incomes: PropTypes.array.isRequired
}

export default Index
