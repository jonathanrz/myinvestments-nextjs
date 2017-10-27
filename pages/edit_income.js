import React from 'react'
import PropTypes from 'prop-types'
import Formsy from 'formsy-react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { FormsyDate, FormsyText } from 'formsy-material-ui/lib'
import Layout from '../components/MyLayout.js'
import { routeToInvestment } from '../components/Router.js'
import { getInvestment, getIncomes, getIncome, getToken, newIncome, saveIncome } from '../components/Api'

class Index extends React.Component {
  static propTypes = {
    investment: PropTypes.object.isRequired,
    lastIncome: PropTypes.object,
    income: PropTypes.object
  }

  static async getInitialProps ({ query, req }) {
    const investment = await getInvestment(getToken(req), query.investment_id)
    if (query.income_id) {
      const income = await getIncome(getToken(req), query.investment_id, query.income_id)

      return {
        investment: investment.data,
        income: income.data
      }
    } else {
      const incomes = await getIncomes(getToken(req), query.investment_id)

      return {
        investment: investment.data,
        lastIncome: incomes.data[0]
      }
    }
  }

  constructor (props) {
    super(props)
    const { income, lastIncome } = props
    this.state = {
      canSubmit: false,
      date: income ? new Date(new Date(income.date).getTime() + 3 * 60 * 60 * 1000) : new Date(),
      quantity: income ? income.quantity : lastIncome.quantity,
      value: income ? income.value : lastIncome.value,
      bought: income ? income.bought : 0
    }

    this.enableSubmit = this.enableSubmit.bind(this)
    this.disableSubmit = this.disableSubmit.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  enableSubmit () {
    this.setState({
      canSubmit: true
    })
  }

  disableSubmit () {
    this.setState({
      canSubmit: false
    })
  }

  submitForm (data) {
    const { investment, income } = this.props
    if (income) {
      saveIncome(getToken(), investment._id, income._id, data).then(response => {
        routeToInvestment(investment._id)
      })
    } else {
      newIncome(getToken(), investment._id, data).then(response => {
        routeToInvestment(investment._id)
      })
    }
  }

  handleDateChange (event) {
    this.setState({ date: event.target.value })
  }

  handleQuantityChange (event) {
    this.setState({ quantity: event.target.value })
  }

  handleValueChange (event) {
    this.setState({ value: event.target.value })
  }

  handleBoughtChange (event) {
    this.setState({ bought: event.target.value })
  }

  render () {
    const { investment } = this.props
    const { date, quantity, value, bought } = this.state

    return (
      <Layout
        title={`Novo Recebimento de ${investment.name}`}
        detail={true}
        onNavigationClose={() => {
          routeToInvestment(investment._id)
        }}
      >
        <Paper
          style={{
            width: 420,
            padding: '20px 60px'
          }}
        >
          <Formsy.Form onValid={this.enableSubmit} onInvalid={this.disableSubmit} onValidSubmit={this.submitForm}>
            <FormsyDate name="date" required floatingLabelText="Data" onChange={this.handleDateChange} value={date} />
            <FormsyText
              name="quantity"
              required
              validations="isNumeric"
              floatingLabelText="Quantidade"
              onChange={this.handleQuantityChange}
              value={quantity}
              style={{ display: 'block' }}
            />
            <FormsyText name="value" required validations="isNumeric" floatingLabelText="Valor" onChange={this.handleValueChange} value={value} style={{ display: 'block' }} />
            <FormsyText
              name="bought"
              required
              validations="isNumeric"
              floatingLabelText="Comprado"
              onChange={this.handleBoughtChange}
              value={bought}
              style={{ display: 'block' }}
            />
            <RaisedButton type="submit" label="Enviar" disabled={!this.state.canSubmit} style={{ display: 'block', margin: '32px 0', width: 256 }} />
          </Formsy.Form>
        </Paper>
      </Layout>
    )
  }
}

export default Index
