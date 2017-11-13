import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Layout from '../components/MyLayout.js'
import Date from '../components/Date'
import { Money, MoneyWithColor, MoneyWithInvertedColor } from '../components/Money'
import { PercentWithColor } from '../components/Percent'
import { getInvestment, getIncomes, getToken } from '../components/Api'
import { routeToInvestments, routeToEditInvestment, routeToNewIncome, routeToEditIncome } from '../components/Router.js'
import { formatMoney } from '../lib/number'
import { incomeGain } from '../lib/income'

class Index extends React.Component {
  static async getInitialProps ({ query, req }) {
    const resInvestment = await getInvestment(getToken(req), query.id)
    const resIncomes = await getIncomes(getToken(req), query.id)
    const incomes = resIncomes.data
    var lastIncomeValue = 0
    var totalBought = 0
    var currentValue = incomes.length > 0 ? incomes[0].value : 0
    var totalMonths = incomes.length - 1

    return {
      investment: resInvestment.data,
      incomes: incomes
        .reverse()
        .map(item => {
          totalBought += item.bought || 0
          if (lastIncomeValue === 0) {
            item.gain = incomeGain(item)
            item.gainInPerc = item.gain / item.value
          } else {
            item.gain = incomeGain(item) - lastIncomeValue
            item.gainInPerc = item.gain / lastIncomeValue
          }
          lastIncomeValue = item.value
          return item
        })
        .reverse(),
      currentValue: currentValue,
      totalBought: totalBought,
      totalMonths: totalMonths
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
    const { investment, incomes, currentValue, totalBought, totalMonths } = this.props

    return (
      <Layout
        title={investment.name}
        detail={true}
        onNavigationClose={() => {
          routeToInvestments()
        }}
        rightElements={() => {
          return (
            <IconButton>
              <EditorModeEdit
                onClick={() => {
                  routeToEditInvestment(investment._id)
                }}
              />
            </IconButton>
          )
        }}
      >
        <Card>
          <CardHeader title={investment.type} subtitle={investment.holder} actAsExpander={false} showExpandableButton={false} />
          <CardText>
            <div>
              <strong>Investimento:</strong> {formatMoney(totalBought, 2)}{' '}
            </div>
            <div>
              <strong>Rendimento:</strong> {formatMoney(currentValue - totalBought, 2)}{' '}
            </div>
            <div>
              <strong>Meses:</strong> {totalMonths}{' '}
            </div>
          </CardText>
          <CardMedia style={{ marginTop: 20 }}>
            <Subheader>Rendimentos</Subheader>
            <Divider />
            <Table fixedHeader selectable={false} bodyStyle={{ overflowY: 'hidden' }} onCellClick={this.onIncomeCell}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Data</TableHeaderColumn>
                  <TableHeaderColumn>Quantidade</TableHeaderColumn>
                  <TableHeaderColumn>Valor</TableHeaderColumn>
                  <TableHeaderColumn>Comprado</TableHeaderColumn>
                  <TableHeaderColumn>Rendimento</TableHeaderColumn>
                  <TableHeaderColumn>IR</TableHeaderColumn>
                  <TableHeaderColumn>Taxa</TableHeaderColumn>
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
                      <MoneyWithColor value={item.gross} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <MoneyWithInvertedColor value={item.ir} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <MoneyWithInvertedColor value={item.fee} />
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
          <Divider style={{ marginTop: 20 }} />
          <CardActions>
            <RaisedButton
              label="Novo Rendimento"
              secondary={true}
              onClick={this.onNewIncome}
              style={{
                margin: 12
              }}
            />
          </CardActions>
        </Card>
      </Layout>
    )
  }
}

Index.propTypes = {
  investment: PropTypes.element.isRequired,
  incomes: PropTypes.array.isRequired,
  currentValue: PropTypes.number.isRequired,
  totalBought: PropTypes.number.isRequired,
  totalMonths: PropTypes.number.isRequired
}

export default Index
