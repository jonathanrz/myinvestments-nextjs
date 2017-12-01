import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import Snackbar from 'material-ui/Snackbar'
import { Card, CardMedia } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import { formatMoney } from '../lib/number'
import { newIncome, getToken } from '../components/Api'

const today = moment.utc()

const filterInvestment = investment => {
  if (investment.incomes.length === 0) return false

  const lastIncomeDate = moment.utc(investment.incomes[0].date)
  if (lastIncomeDate.year() > today.year()) return false
  if (lastIncomeDate.year() < today.year()) return true
  if (lastIncomeDate.month() >= today.month()) return false

  return true
}

class MonthIncomes extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.state = { message: '', snackbarOpen: false }
  }

  createNewIncome = investment => {
    const lastIncome = investment.incomes[0]

    const data = {
      date: moment(),
      quantity: lastIncome.quantity,
      value: investment.newValue,
      bought: 0,
      gross: 0,
      ir: 0,
      fee: 0
    }

    const that = this

    newIncome(getToken(), investment._id, data)
      .then(response => {
        if (response.status === 200) {
          that.setState({ message: `Rendimento ${response.data._id} criado com sucesso`, snackbarOpen: true })
        } else {
          that.setState({ message: `Erro ao criar o rendimento, response: ${response.statusText}`, snackbarOpen: true })
        }
      })
      .catch(function (error) {
        if (error.response) {
          that.setState({ message: `Erro ao criar o rendimento, response: ${JSON.stringify(error.response.data)}`, snackbarOpen: true })
        } else {
          that.setState({ message: `Erro ao criar o rendimento, erro: ${error}`, snackbarOpen: true })
        }
      })
  }

  render () {
    const investments = this.props.investments.filter(investment => filterInvestment(investment))
    const { message, snackbarOpen } = this.state

    return (
      <Card>
        <CardMedia>
          <Table fixedHeader selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Nome</TableHeaderColumn>
                <TableHeaderColumn>Tipo</TableHeaderColumn>
                <TableHeaderColumn>Titular</TableHeaderColumn>
                <TableHeaderColumn>Rendimento</TableHeaderColumn>
                <TableHeaderColumn>Confirmar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {investments &&
                investments.map(item => (
                  <TableRow key={item._id}>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn>{item.type}</TableRowColumn>
                    <TableRowColumn>{item.holder}</TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText={formatMoney(item.incomes[0].value, 2)}
                        onChange={(event, newValue) => {
                          item.newValue = Number(newValue)
                        }}
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton type="submit" label="Enviar" secondary={true} onClick={() => this.createNewIncome(item)} />
                    </TableRowColumn>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardMedia>
        <Divider style={{ marginTop: 20 }} />
        <CardMedia>
          <Snackbar
            open={snackbarOpen}
            message={message}
            autoHideDuration={5000}
            onRequestClose={() => {
              this.setState({ snackbarOpen: false })
            }}
          />
        </CardMedia>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  investments: state.data.filteredInvestments.investments
})

export default connect(mapStateToProps, null)(MonthIncomes)
