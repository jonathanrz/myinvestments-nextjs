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
    const { investment, income, lastIncome } = props
    this.state = {
      canSubmit: false,
      date: income ? new Date(new Date(income.date).getTime() + 3 * 60 * 60 * 1000) : new Date(),
      quantity: income ? income.quantity : lastIncome ? lastIncome.quantity : 0,
      value: income ? income.value : lastIncome ? lastIncome.value : 0,
      bought: income ? income.bought : 0,
      gross: income ? income.gross : 0,
      ir: income ? income.ir : 0,
      fee: income ? income.fee : 0
    }

    this.title = income ? `Alterar Recebimento de ${investment.name}` : `Novo Recebimento de ${investment.name}`

    this.numericFields = [
      {
        name: 'quantity',
        label: 'Quantidade'
      },
      {
        name: 'value',
        label: 'Valor'
      },
      {
        name: 'bought',
        label: 'Comprado'
      },
      {
        name: 'gross',
        label: 'Rendimento'
      },
      {
        name: 'ir',
        label: 'IR'
      },
      {
        name: 'fee',
        label: 'Taxa'
      }
    ]

    this.enableSubmit = this.enableSubmit.bind(this)
    this.disableSubmit = this.disableSubmit.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  handleDateChange (date) {
    this.setState({ date: date })
  }

  handleChange (event, field) {
    let state = this.state
    state[field] = event.target.value
    this.setState(state)
  }

  render () {
    const { investment } = this.props
    const { date } = this.state

    return (
      <Layout
        title={this.title}
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
            {this.numericFields.map(field => (
              <FormsyText
                key={field.name}
                name={field.name}
                required
                validations="isNumeric"
                floatingLabelText={field.label}
                onChange={e => {
                  this.handleChange(field.name, e)
                }}
                value={this.state[field.name]}
                style={{ display: 'block' }}
              />
            ))}
            <RaisedButton type="submit" label="Enviar" secondary={true} disabled={!this.state.canSubmit} style={{ display: 'block', margin: '32px 0', width: 256 }} />
          </Formsy.Form>
        </Paper>
      </Layout>
    )
  }
}

export default Index
